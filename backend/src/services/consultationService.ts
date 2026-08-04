import { Consultation } from "../models/Consultation";
import { Message } from "../models/Message";
import { ApiError } from "../utils/ApiError";
import { buildSystemPrompt, generateAssistantReply, detectsCompletion, ChatTurn } from "./aiService";
import { extractProfileUpdates } from "../utils/profileExtractor";
import { getRecommendationsForProfile } from "./recommendationService";

export async function startConsultation(userId: string) {
  const consultation = await Consultation.create({ user: userId, status: "in_progress", profile: {} });

  const openingLine =
    "Hello — I'm CHARIS. Let's find something wonderful together. Who is this gift for?";

  await Message.create({ consultation: consultation._id, role: "assistant", content: openingLine });

  return { consultation, message: openingLine };
}

export async function getConsultation(userId: string, consultationId: string) {
  const consultation = await Consultation.findOne({ _id: consultationId, user: userId });
  if (!consultation) throw ApiError.notFound("Consultation not found.");

  const messages = await Message.find({ consultation: consultation._id }).sort({ createdAt: 1 });
  return { consultation, messages };
}

export async function listConsultations(userId: string) {
  return Consultation.find({ user: userId }).sort({ updatedAt: -1 });
}

export async function postUserReply(userId: string, consultationId: string, userText: string) {
  const consultation = await Consultation.findOne({ _id: consultationId, user: userId });
  if (!consultation) throw ApiError.notFound("Consultation not found.");
  if (consultation.status === "complete") {
    throw ApiError.badRequest("This consultation has already been completed.");
  }

  await Message.create({ consultation: consultation._id, role: "user", content: userText });

  // Update the running profile with lightweight extraction from this reply.
  consultation.profile = extractProfileUpdates(userText, consultation.profile);
  await consultation.save();

  const history = await Message.find({ consultation: consultation._id }).sort({ createdAt: 1 });
  const turns: ChatTurn[] = [
    { role: "system", content: buildSystemPrompt(consultation.profile) },
    ...history.map((m) => ({ role: m.role, content: m.content } as ChatTurn)),
  ];

  const raw = await generateAssistantReply(turns);
  const { complete, text } = detectsCompletion(raw);

  await Message.create({ consultation: consultation._id, role: "assistant", content: text });

  if (complete) {
    const products = await getRecommendationsForProfile(consultation.profile);
    consultation.status = "complete";
    consultation.recommendedProductIds = products.map((p) => p._id);
    await consultation.save();

    return { assistantMessage: text, complete: true, recommendations: products };
  }

  return { assistantMessage: text, complete: false, recommendations: [] };
}
