import { ChatMessage, ConsultationProfile } from "@/types";
import { CONSULTATION_COMPLETE } from "./mockAiService";

/**
 * Production concierge service. Not called from the frontend directly —
 * lives on the Express backend at services/ai/ollamaService.ts and is
 * reached through POST /api/consultations/:id/messages.
 *
 * This file documents the contract so swapping mockAiService.ts for a
 * real fetch() to the backend is a drop-in change: same function
 * signature, same return shape, just backed by a real model instead of
 * a scripted state machine.
 */

const SYSTEM_PROMPT = `You are CHARIS, an elite luxury gifting concierge.
You speak warmly, elegantly, and never sound robotic or scripted.
Ask exactly one thoughtful question at a time about the recipient:
who they are, the relationship, the occasion, their personality,
interests, lifestyle, and the emotional impact the gift should have.
Remember everything the user has told you — never ask something twice.
Once you have enough to make a genuinely personal recommendation,
respond with the single token ${CONSULTATION_COMPLETE} and nothing else.`;

export interface OllamaChatRequest {
  model: string;
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  stream: boolean;
}

/**
 * Example of the real call this function will make once wired up to a
 * local Ollama instance (http://localhost:11434 by default). Left
 * unimplemented here since this environment has no model runtime —
 * the Express route below is where it belongs.
 */
export async function getConciergeReplyFromOllama(
  history: ChatMessage[],
  profile: ConsultationProfile,
  model: string = "qwen2.5"
): Promise<string> {
  const payload: OllamaChatRequest = {
    model,
    stream: false,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "system",
        content: `Known profile so far: ${JSON.stringify(profile)}`,
      },
      ...history.map((m) => ({
        role: (m.role === "ai" ? "assistant" : "user") as "assistant" | "user",
        content: m.content,
      })),
    ],
  };

  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.message?.content ?? "";
}
