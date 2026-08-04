import { Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthedRequest } from "../middlewares/auth";
import {
  startConsultation,
  getConsultation,
  listConsultations,
  postUserReply,
} from "../services/consultationService";
import { Message } from "../models/Message";
import { Consultation } from "../models/Consultation";
import { buildSystemPrompt, detectsCompletion, streamAssistantReply, ChatTurn } from "../services/aiService";
import { extractProfileUpdates } from "../utils/profileExtractor";
import { getRecommendationsForProfile } from "../services/recommendationService";
import { ApiError } from "../utils/ApiError";

export const replySchema = z.object({
  message: z.string().min(1).max(2000),
});

export const create = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const result = await startConsultation(req.userId!);
  res.status(201).json(result);
});

export const list = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const consultations = await listConsultations(req.userId!);
  res.status(200).json({ consultations });
});

export const getOne = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const result = await getConsultation(req.userId!, req.params.id);
  res.status(200).json(result);
});

export const reply = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const { message } = req.body;
  const result = await postUserReply(req.userId!, req.params.id, message);
  res.status(200).json(result);
});

export const streamReply = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const consultation = await Consultation.findOne({ _id: req.params.id, user: req.userId });
  if (!consultation) throw ApiError.notFound("Consultation not found.");
  if (consultation.status === "complete") throw ApiError.badRequest("This consultation is complete.");

  await Message.create({ consultation: consultation._id, role: "user", content: req.body.message });
  consultation.profile = extractProfileUpdates(req.body.message, consultation.profile);
  await consultation.save();

  const history = await Message.find({ consultation: consultation._id }).sort({ createdAt: 1 });
  const turns: ChatTurn[] = [
    { role: "system", content: buildSystemPrompt(consultation.profile) },
    ...history.map((m) => ({ role: m.role, content: m.content } as ChatTurn)),
  ];

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  let raw = "";
  for await (const chunk of streamAssistantReply(turns)) {
    raw += chunk;
    res.write(`data: ${JSON.stringify({ type: "delta", content: chunk })}\n\n`);
  }

  const { complete, text } = detectsCompletion(raw);
  await Message.create({ consultation: consultation._id, role: "assistant", content: text });
  let recommendations: unknown[] = [];
  if (complete) {
    const products = await getRecommendationsForProfile(consultation.profile);
    recommendations = products;
    consultation.status = "complete";
    consultation.recommendedProductIds = products.map((product) => product._id);
    await consultation.save();
  }
  res.write(`data: ${JSON.stringify({ type: "done", complete, text, recommendations })}\n\n`);
  res.end();
});
