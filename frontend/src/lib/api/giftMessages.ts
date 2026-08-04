import { apiFetch } from "./client";
import { GiftMessageTone } from "@/types";

export const generateGiftMessage = (token: string, body: {
  tone: GiftMessageTone; recipient?: string; occasion?: string; productName?: string; context?: string;
}) => apiFetch<{ message: string }>("/gift-messages/generate", { method: "POST", token, body });

export const improveGiftMessage = (token: string, message: string, tone: GiftMessageTone) =>
  apiFetch<{ message: string }>("/gift-messages/improve", { method: "POST", token, body: { message, tone } });
