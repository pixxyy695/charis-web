import { Product, IProduct } from "../models/Product";
import { ConsultationProfile } from "../models/Consultation";

const WEIGHTS = {
  relationship: 3,
  occasion: 3,
  personality: 2,
  interests: 2,
  emotion: 2,
};

export function scoreProduct(product: IProduct, profile: ConsultationProfile): number {
  let score = 0;

  if (profile.relationship && product.tags.relationship.some((t) => t.includes(profile.relationship!))) {
    score += WEIGHTS.relationship;
  }
  if (profile.occasion && product.tags.occasion.some((t) => t.includes(profile.occasion!))) {
    score += WEIGHTS.occasion;
  }
  if (profile.emotion && product.tags.emotion.some((t) => t.includes(profile.emotion!))) {
    score += WEIGHTS.emotion;
  }

  (profile.personality ?? []).forEach((trait) => {
    if (product.tags.personality.some((t) => t.includes(trait))) score += WEIGHTS.personality;
  });

  (profile.interests ?? []).forEach((interest) => {
    if (product.tags.interests.some((t) => t.includes(interest))) score += WEIGHTS.interests;
  });

  if (profile.budget) {
    const amounts = profile.budget.match(/[\d,.]+/g)?.map((value) => Number(value.replace(/,/g, ""))).filter(Number.isFinite) ?? [];
    const ceiling = amounts.length ? Math.max(...amounts) : undefined;
    if (ceiling && product.price <= ceiling) score += 3;
    if (ceiling && product.price > ceiling * 1.15) score -= 5;
  }

  return score;
}

/**
 * Scores every product in the catalog against the collected consultation
 * profile and returns the top 3–5 matches. Falls back to a curated/random
 * slice if nothing scores above zero, so the concierge never returns empty.
 */
export async function getRecommendationsForProfile(profile: ConsultationProfile): Promise<IProduct[]> {
  const products = await Product.find();

  const scored = products
    .map((p) => ({ product: p, score: scoreProduct(p, profile) }))
    .sort((a, b) => b.score - a.score);

  const matched = scored.filter((s) => s.score > 0).slice(0, 5);

  if (matched.length >= 3) {
    return matched.map((s) => s.product);
  }

  // Fallback: top matched plus highest-priced curated pieces to fill out to 3.
  const fallback = scored.slice(0, 5).map((s) => s.product);
  return fallback;
}

export async function listProducts(filters: { category?: string; search?: string }) {
  const query: Record<string, unknown> = {};
  if (filters.category) query.category = filters.category;
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: "i" } },
      { brand: { $regex: filters.search, $options: "i" } },
    ];
  }
  return Product.find(query).sort({ createdAt: -1 });
}

export async function getProductById(id: string) {
  return Product.findById(id);
}
