import { create } from "zustand";
import { ChatMessage, ConsultationProfile, ConsultationStatus, Product } from "@/types";

interface ConsultationState {
  consultationId: string | null;
  messages: ChatMessage[];
  profile: ConsultationProfile;
  status: ConsultationStatus;
  isTyping: boolean;
  recommendations: Product[];
  setConsultationId: (id: string | null) => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  updateMessage: (id: string, content: string) => void;
  setTyping: (isTyping: boolean) => void;
  setProfile: (profile: ConsultationProfile) => void;
  setRecommendations: (products: Product[]) => void;
  complete: () => void;
  reset: () => void;
}

const initialState = {
  consultationId: null as string | null,
  messages: [] as ChatMessage[],
  profile: {} as ConsultationProfile,
  status: "active" as ConsultationStatus,
  isTyping: false,
  recommendations: [] as Product[],
};

export const useConsultationStore = create<ConsultationState>((set) => ({
  ...initialState,
  setConsultationId: (id) => set({ consultationId: id }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  updateMessage: (id, content) => set((state) => ({ messages: state.messages.map((message) => message.id === id ? { ...message, content } : message) })),
  setTyping: (isTyping) => set({ isTyping }),
  setProfile: (profile) => set({ profile }),
  setRecommendations: (recommendations) => set({ recommendations }),
  complete: () => set({ status: "complete" }),
  reset: () => set(initialState),
}));
