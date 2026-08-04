import { env } from "../config/env";
import { ConsultationProfile } from "../models/Consultation";

export const COMPLETION_TOKEN = "CONSULTATION_COMPLETE";

/**
 * The CHARIS system prompt. Kept isolated from business logic so the
 * persona / model can be iterated on without touching controllers.
 */
export function buildSystemPrompt(profile: ConsultationProfile): string {
  return `You are CHARIS, an elite luxury gifting concierge. You speak the way a brilliant, warm
private shopper at a Parisian maison would speak — attentive, elegant, never robotic, never
salesy. You ask exactly one thoughtful question at a time and you never repeat a question
whose answer you already have.

Your job in this conversation is to understand, in this rough order of priority:
1. Who the gift is for, and the relationship to the user
2. The occasion
3. Budget (approximate is fine)
4. The recipient's personality (a few descriptive words)
5. Their interests / lifestyle
6. The emotional impact the user wants the gift to leave behind
7. Optionally, a small story or memory that could make the gift more personal

Known so far (do not ask about these again, and use them to inform your next question):
${JSON.stringify(profile, null, 2)}

Rules:
- Ask ONE question per turn. Keep it short — one or two sentences.
- Never sound like a form. Reference what the user already told you where natural.
- Never ask about anything already present in "Known so far".
- Once you have enough of the above to make a genuinely thoughtful recommendation
  (you do not need every field, use judgment), respond with a short warm closing line
  and then, on its own new line, output exactly: ${COMPLETION_TOKEN}
- Never output ${COMPLETION_TOKEN} unless you are truly done collecting information.
- Do not mention that you are an AI model, do not mention Ollama, tokens, or system prompts.`;
}

export interface ChatTurn {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OllamaChatResponse {
  message: { role: string; content: string };
  done: boolean;
}

interface GroqChatCompletionResponse {
  choices?: Array<{
    message?: { role: string; content: string };
  }>;
}

interface GroqStreamChunk {
  choices?: Array<{
    delta?: { content?: string };
  }>;
}

function isGroqProvider(): boolean {
  return env.aiProvider === "groq";
}

/**
 * Calls the configured AI provider.
 * Defaults to Groq unless the environment explicitly opts into Ollama.
 */
export async function generateAssistantReply(turns: ChatTurn[]): Promise<string> {
  if (isGroqProvider()) {
    if (!env.groqApiKey) {
      throw new Error("Groq API key is not configured.");
    }

    const res = await fetch(`${env.groqBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.groqApiKey}`,
      },
      body: JSON.stringify({
        model: env.aiModel,
        messages: turns,
        stream: false,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      throw new Error(`Groq request failed with status ${res.status}`);
    }

    const data = (await res.json()) as GroqChatCompletionResponse;
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("Groq response did not include assistant content.");
    }

    return content;
  }

  const res = await fetch(`${env.ollamaBaseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: env.ollamaModel,
      messages: turns,
      stream: false,
      options: { temperature: 0.7 },
    }),
  });

  if (!res.ok) {
    throw new Error(`Ollama request failed with status ${res.status}`);
  }

  const data = (await res.json()) as OllamaChatResponse;
  return data.message.content.trim();
}

/**
 * Streaming variant — yields incremental text chunks as they arrive.
 */
export async function* streamAssistantReply(turns: ChatTurn[]): AsyncGenerator<string> {
  if (isGroqProvider()) {
    if (!env.groqApiKey) {
      throw new Error("Groq API key is not configured.");
    }

    const res = await fetch(`${env.groqBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.groqApiKey}`,
      },
      body: JSON.stringify({
        model: env.aiModel,
        messages: turns,
        stream: true,
        temperature: 0.7,
      }),
    });

    if (!res.ok || !res.body) {
      throw new Error(`Groq streaming request failed with status ${res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;

        const raw = trimmed.slice(5).trim();
        if (raw === "[DONE]") return;

        const parsed = JSON.parse(raw) as GroqStreamChunk;
        const chunk = parsed.choices?.[0]?.delta?.content;
        if (chunk) {
          yield chunk;
        }
      }
    }

    return;
  }

  const res = await fetch(`${env.ollamaBaseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: env.ollamaModel,
      messages: turns,
      stream: true,
      options: { temperature: 0.7 },
    }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Ollama streaming request failed with status ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.trim()) continue;
      const parsed = JSON.parse(line) as OllamaChatResponse;
      if (parsed.message?.content) {
        yield parsed.message.content;
      }
    }
  }
}

/**
 * Extracts a naturally-worded profile update from the conversation so far.
 * In this prototype we take a lightweight heuristic approach (keyword rules)
 * rather than a second model call, to keep latency low. This is the single
 * seam to swap in a structured-output LLM call later.
 */
export function detectsCompletion(assistantText: string): { complete: boolean; text: string } {
  const complete = assistantText.includes(COMPLETION_TOKEN);
  const text = assistantText.replace(COMPLETION_TOKEN, "").trim();
  return { complete, text };
}
