// UI-facing role naming reads better in chat components; the API layer
// (lib/api/consultations.ts) is the single place that translates to/from
// the backend's "assistant" | "user" role naming.
export type MessageRole = "ai" | "user";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  quickReplies?: string[];
}

// Field names match the backend's Consultation.profile schema exactly
// (backend/src/models/Consultation.ts) so no renaming happens at the
// API boundary.
export interface ConsultationProfile {
  recipient?: string;
  relationship?: string;
  occasion?: string;
  budget?: string;
  personality?: string[];
  interests?: string[];
  lifestyle?: string;
  emotion?: string;
  story?: string;
}

// UI-facing status; the API layer maps the backend's "in_progress" to
// "active".
export type ConsultationStatus = "active" | "complete";

export interface Consultation {
  id: string;
  status: ConsultationStatus;
  messages: ChatMessage[];
  profile: ConsultationProfile;
  createdAt: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  story: string;
  symbolicMeaning: string;
  deliveryEstimate: string;
  images: string[];
  tags: {
    relationship: string[];
    occasion: string[];
    personality: string[];
    interests: string[];
    emotion: string[];
  };
}

export interface Recommendation {
  product: Product;
  score: number;
  reason: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface SavedGift {
  id: string;
  product: Product;
  consultation?: string;
  giftMessage?: string;
  createdAt: string;
}

export interface DashboardSummary {
  user: User;
  stats: { totalConsultations: number; inProgress: number; completed: number; savedGifts: number };
  recentConsultations: Array<Omit<Consultation, "messages">>;
  savedGifts: SavedGift[];
}

export type GiftMessageTone = "elegant" | "heartfelt" | "formal" | "romantic" | "warm";
