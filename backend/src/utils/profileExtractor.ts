import { ConsultationProfile } from "../models/Consultation";

/**
 * Lightweight, dependency-free keyword extraction used to keep the
 * consultation profile (and therefore recommendation tags) updated as the
 * conversation progresses, without a second round-trip to the LLM.
 *
 * This is intentionally simple for the prototype — swap for a structured
 * "extract fields as JSON" LLM call if higher accuracy is needed later.
 */

const RELATIONSHIPS = ["partner", "spouse", "husband", "wife", "friend", "mother", "mom", "father", "dad", "sister", "brother", "colleague", "boss", "child", "daughter", "son", "grandmother", "grandfather"];
const OCCASIONS = ["anniversary", "birthday", "wedding", "graduation", "promotion", "retirement", "holiday", "christmas", "just because", "engagement", "new baby", "housewarming"];
const EMOTIONS = ["seen", "delight", "reassurance", "gratitude", "joy", "nostalgia", "comfort", "pride", "romance", "wonder"];
const INTERESTS = ["travel", "art", "wine", "reading", "cooking", "fashion", "music", "photography", "gardening", "fitness", "design", "tea", "coffee", "watches", "fragrance"];

export function extractProfileUpdates(userMessage: string, current: ConsultationProfile): ConsultationProfile {
  const lower = userMessage.toLowerCase();
  const updated: ConsultationProfile = { ...current };

  if (!updated.relationship) {
    const match = RELATIONSHIPS.find((r) => lower.includes(r));
    if (match) updated.relationship = match;
  }

  if (!updated.occasion) {
    const match = OCCASIONS.find((o) => lower.includes(o));
    if (match) updated.occasion = match;
  }

  if (!updated.emotion) {
    const match = EMOTIONS.find((e) => lower.includes(e));
    if (match) updated.emotion = match;
  }

  const foundInterests = INTERESTS.filter((i) => lower.includes(i));
  if (foundInterests.length) {
    const set = new Set([...(updated.interests ?? []), ...foundInterests]);
    updated.interests = Array.from(set);
  }

  const budgetMatch = lower.match(/\$?\s?(\d{2,5})\s?(?:-|to)?\s?(\d{2,5})?/);
  if (!updated.budget && budgetMatch && /budget|spend|price|\$/.test(lower)) {
    updated.budget = budgetMatch[2] ? `$${budgetMatch[1]}-$${budgetMatch[2]}` : `~$${budgetMatch[1]}`;
  }

  // First substantive reply is treated as the "recipient" descriptor if unset.
  if (!updated.recipient && current.recipient === undefined) {
    updated.recipient = userMessage.slice(0, 60);
  }

  // Anything describing character traits, appended as personality tags (rough heuristic).
  if (/quiet|bold|curious|warm|elegant|nostalgic|artistic|calm|playful|adventurous|thoughtful/.test(lower)) {
    const traits = lower.match(/quiet|bold|curious|warm|elegant|nostalgic|artistic|calm|playful|adventurous|thoughtful/g) ?? [];
    const set = new Set([...(updated.personality ?? []), ...traits]);
    updated.personality = Array.from(set);
  }

  return updated;
}
