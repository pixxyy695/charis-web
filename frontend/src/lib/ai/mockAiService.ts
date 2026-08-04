import { ChatMessage, ConsultationProfile } from "@/types";

/**
 * Mock implementation of the CHARIS concierge brain.
 *
 * This mirrors the contract the real backend (Express + Ollama, see
 * ollamaService.ts) will fulfil: given the conversation so far and the
 * profile extracted from it, decide the next question, extract new
 * profile fields from the user's last answer, and signal completion
 * with the CONSULTATION_COMPLETE sentinel once enough is known.
 *
 * Swapping this for the real service is a one-line change in
 * ChatWindow.tsx — the interface below is intentionally identical.
 */

export const CONSULTATION_COMPLETE = "CONSULTATION_COMPLETE";

interface ConciergeTurn {
  reply: string;
  quickReplies: string[];
  updatedProfile: ConsultationProfile;
  isComplete: boolean;
}

const QUESTION_ORDER: (keyof ConsultationProfile)[] = [
  "recipient",
  "relationship",
  "occasion",
  "personality",
  "emotion",
];

const QUESTION_COPY: Record<
  string,
  { prompt: string; quickReplies: string[] }
> = {
  recipient: {
    prompt: "Hello — I'm CHARIS, your gifting concierge. Who is this gift for?",
    quickReplies: ["My partner", "A close friend", "My mother"],
  },
  relationship: {
    prompt: "Lovely. And what's the occasion bringing this gift into being?",
    quickReplies: ["Anniversary", "Just because", "A milestone birthday"],
  },
  occasion: {
    prompt:
      "Understood. If you had to describe them in three words, what would they be?",
    quickReplies: [
      "Quiet, thoughtful, elegant",
      "Bold, curious, warm",
      "Nostalgic, artistic, calm",
    ],
  },
  personality: {
    prompt:
      "That tells me a great deal already. What feeling do you want this gift to leave behind?",
    quickReplies: ["Being deeply seen", "Pure delight", "Quiet reassurance"],
  },
  emotion: {
    prompt:
      "Thank you — that's everything I need. Let me put together a shortlist worthy of them.",
    quickReplies: [],
  },
};

function nextMissingField(
  profile: ConsultationProfile
): keyof ConsultationProfile | null {
  for (const field of QUESTION_ORDER) {
    if (!profile[field] || (Array.isArray(profile[field]) && (profile[field] as string[]).length === 0)) {
      return field;
    }
  }
  return null;
}

/**
 * Given the field the user was just asked about and their raw answer,
 * write it into the profile. A real LLM call would extract structured
 * data from free text; here we store the raw answer directly since the
 * mock's questions map 1:1 to fields.
 */
function applyAnswer(
  profile: ConsultationProfile,
  field: keyof ConsultationProfile | null,
  answer: string
): ConsultationProfile {
  if (!field) return profile;
  if (field === "personality") {
    return { ...profile, personality: answer.split(",").map((s) => s.trim()) };
  }
  return { ...profile, [field]: answer };
}

export async function getNextConciergeTurn(
  history: ChatMessage[],
  profile: ConsultationProfile
): Promise<ConciergeTurn> {
  // Simulate network + inference latency so the UI's typing indicator
  // has something honest to show.
  await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 500));

  const lastAnswer = [...history].reverse().find((m) => m.role === "user");
  const priorField = QUESTION_ORDER.find(
    (f) => !profile[f] || (Array.isArray(profile[f]) && (profile[f] as string[]).length === 0)
  );

  // The field the user just answered is the one immediately preceding
  // the field currently missing, i.e. the previous item in the order.
  const answeredIndex = priorField ? QUESTION_ORDER.indexOf(priorField) - 1 : QUESTION_ORDER.length - 1;
  const answeredField = answeredIndex >= 0 ? QUESTION_ORDER[answeredIndex] : null;

  const updatedProfile = lastAnswer
    ? applyAnswer(profile, answeredField, lastAnswer.content)
    : profile;

  const missing = nextMissingField(updatedProfile);

  if (!missing) {
    return {
      reply: QUESTION_COPY.emotion.prompt,
      quickReplies: [],
      updatedProfile,
      isComplete: true,
    };
  }

  const copy = QUESTION_COPY[missing];
  return {
    reply: copy.prompt,
    quickReplies: copy.quickReplies,
    updatedProfile,
    isComplete: false,
  };
}
