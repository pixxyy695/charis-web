import { generateAssistantReply } from "./aiService";

export type MessageTone = "elegant" | "heartfelt" | "formal" | "romantic" | "warm";

const TONE_GUIDANCE: Record<MessageTone, string> = {
  elegant: "refined, understated, a little poetic, never gushing",
  heartfelt: "sincere and personal, warm without being sentimental to excess",
  formal: "polished and respectful, suitable for a professional or distant relation",
  romantic: "tender and intimate, quietly evocative, not overwrought",
  warm: "friendly, easy, affectionate, like a note to someone you adore",
};

export async function generateGiftMessage(params: {
  tone: MessageTone;
  recipient?: string;
  occasion?: string;
  productName?: string;
  context?: string;
}): Promise<string> {
  const { tone, recipient, occasion, productName, context } = params;

  const prompt = `Write a short gift note (2-4 sentences, no salutation like "Dear X" unless natural)
in a ${tone} tone: ${TONE_GUIDANCE[tone]}.
${recipient ? `The recipient is: ${recipient}.` : ""}
${occasion ? `The occasion is: ${occasion}.` : ""}
${productName ? `The gift being given is: ${productName}.` : ""}
${context ? `Additional context from the giver: ${context}.` : ""}
Return only the note text, nothing else — no quotation marks, no explanation.`;

  const reply = await generateAssistantReply([
    { role: "system", content: "You are a skilled, tasteful writer of short gift notes for a luxury concierge service." },
    { role: "user", content: prompt },
  ]);

  return reply.trim();
}

export async function improveGiftMessage(existingMessage: string, tone: MessageTone): Promise<string> {
  const prompt = `Improve the following gift note, keeping its core meaning and length similar,
but sharpening the language and shifting it toward a ${tone} tone (${TONE_GUIDANCE[tone]}):

"""
${existingMessage}
"""

Return only the improved note text, nothing else.`;

  const reply = await generateAssistantReply([
    { role: "system", content: "You are a skilled, tasteful editor of short gift notes for a luxury concierge service." },
    { role: "user", content: prompt },
  ]);

  return reply.trim();
}
