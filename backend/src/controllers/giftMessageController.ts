import { Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { generateGiftMessage, improveGiftMessage } from "../services/giftMessageService";

const toneEnum = z.enum(["elegant", "heartfelt", "formal", "romantic", "warm"]);

export const generateSchema = z.object({
  tone: toneEnum,
  recipient: z.string().optional(),
  occasion: z.string().optional(),
  productName: z.string().optional(),
  context: z.string().optional(),
});

export const improveSchema = z.object({
  message: z.string().min(1).max(2000),
  tone: toneEnum,
});

export const generate = asyncHandler(async (req, res: Response) => {
  const message = await generateGiftMessage(req.body);
  res.status(200).json({ message });
});

export const improve = asyncHandler(async (req, res: Response) => {
  const { message, tone } = req.body;
  const improved = await improveGiftMessage(message, tone);
  res.status(200).json({ message: improved });
});
