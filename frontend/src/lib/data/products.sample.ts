import { Product } from "@/types";

/**
 * A representative slice of the 35-product seed set described in the
 * spec. The full list, plus the Mongoose seed script, ships with the
 * backend package (backend/src/seed/products.seed.ts) — this file
 * exists so the frontend recommendation UI has realistic data to
 * render against before the API is wired up.
 */
export const sampleProducts: Product[] = [
  {
    id: "p001",
    name: "Florentine Hand-Bound Journal",
    brand: "Casa Manoscritto",
    price: 340,
    category: "Stationery",
    description:
      "A journal bound by hand in Florentine goatskin, its pages cut from cotton rag paper that ages like fine linen.",
    story:
      "Each cover is tooled by a single craftsman in a workshop that has bound books the same way since 1932.",
    symbolicMeaning: "A blank page offered with trust — for someone whose thoughts deserve a beautiful home.",
    deliveryEstimate: "5-7 business days",
    images: ["/products/ember-leather-travel-journal.jpg"],
    tags: {
      relationship: ["partner", "mother", "friend"],
      occasion: ["anniversary", "birthday", "just because"],
      personality: ["quiet", "thoughtful", "nostalgic"],
      interests: ["writing", "art"],
      emotion: ["being deeply seen", "quiet reassurance"],
    },
  },
  {
    id: "p002",
    name: "Atelier Pocket Watch, Rose Gold",
    brand: "Verrier & Sons",
    price: 2100,
    category: "Timepieces",
    description: "A mechanical pocket watch with an open-heart movement, cased in 18k rose gold.",
    story: "Verrier & Sons has cased movements for three generations from the same atelier in Geneva.",
    symbolicMeaning: "Time made visible — a reminder that the hours spent together were never ordinary.",
    deliveryEstimate: "7-10 business days",
    images: ["/products/meridian-rose-gold-wristwatch.jpg"],
    tags: {
      relationship: ["partner", "father"],
      occasion: ["milestone birthday", "anniversary"],
      personality: ["bold", "elegant"],
      interests: ["craftsmanship", "history"],
      emotion: ["pure delight", "being deeply seen"],
    },
  },
  {
    id: "p003",
    name: "Amber Light Candle Trio",
    brand: "Maison Cendre",
    price: 165,
    category: "Home",
    description: "Three hand-poured candles evoking a late afternoon in autumn — fig leaf, warm cedar, and quince.",
    story: "Poured in small batches in a converted chapel in Provence.",
    symbolicMeaning: "Warmth given in a form that fills a room, the way their presence fills a life.",
    deliveryEstimate: "3-5 business days",
    images: ["/products/botanical-candle-trio.jpg"],
    tags: {
      relationship: ["mother", "friend"],
      occasion: ["just because", "birthday"],
      personality: ["calm", "artistic", "nostalgic"],
      interests: ["home", "scent"],
      emotion: ["quiet reassurance", "pure delight"],
    },
  },
];
