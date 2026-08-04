import { apiFetch, API_URL } from "./client";
import { ChatMessage, Consultation, ConsultationProfile, Product } from "@/types";

// --- backend-shaped types (backend/src/models) -----------------------

type BackendRole = "user" | "assistant";
type BackendStatus = "in_progress" | "complete";

interface BackendMessage {
  id: string;
  role: BackendRole;
  content: string;
  createdAt: string;
}

interface BackendConsultation {
  id: string;
  status: BackendStatus;
  profile: ConsultationProfile;
  createdAt: string;
  updatedAt?: string;
}

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function toChatMessage(m: BackendMessage): ChatMessage {
  return {
    id: m.id,
    role: m.role === "assistant" ? "ai" : "user",
    content: m.content,
    timestamp: timeLabel(m.createdAt),
  };
}

function toConsultation(c: BackendConsultation, messages: ChatMessage[]): Consultation {
  return {
    id: c.id,
    status: c.status === "in_progress" ? "active" : "complete",
    profile: c.profile,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    messages,
  };
}

export async function listConsultations(token: string): Promise<Consultation[]> {
  const { consultations } = await apiFetch<{ consultations: BackendConsultation[] }>("/consultations", { token });
  return consultations.map((consultation) => toConsultation(consultation, []));
}

// --- public API --------------------------------------------------------

export async function startConsultation(token: string): Promise<Consultation> {
  const { consultation, message } = await apiFetch<{
    consultation: BackendConsultation;
    message: string;
  }>("/consultations", { method: "POST", token });

  const opening: ChatMessage = {
    id: crypto.randomUUID(),
    role: "ai",
    content: message,
    timestamp: timeLabel(consultation.createdAt),
  };

  return toConsultation(consultation, [opening]);
}

export async function getConsultation(token: string, id: string): Promise<Consultation> {
  const { consultation, messages } = await apiFetch<{
    consultation: BackendConsultation;
    messages: BackendMessage[];
  }>(`/consultations/${id}`, { token });

  return toConsultation(consultation, messages.map(toChatMessage));
}

export interface ReplyResult {
  assistantMessage: ChatMessage;
  complete: boolean;
  recommendations: Product[];
  updatedProfile?: ConsultationProfile;
}

export async function sendReply(token: string, consultationId: string, text: string): Promise<ReplyResult> {
  const result = await apiFetch<{
    assistantMessage: string;
    complete: boolean;
    recommendations: Product[];
  }>(`/consultations/${consultationId}/messages`, {
    method: "POST",
    token,
    body: { message: text },
  });

  return {
    assistantMessage: {
      id: crypto.randomUUID(),
      role: "ai",
      content: result.assistantMessage,
      timestamp: timeLabel(new Date().toISOString()),
    },
    complete: result.complete,
    recommendations: result.recommendations,
  };
}

export async function streamReply(token: string, consultationId: string, message: string, handlers: {
  onDelta: (delta: string) => void;
  onDone: (result: { complete: boolean; text: string; recommendations: Product[] }) => void;
}) {
  const response = await fetch(`${API_URL}/consultations/${consultationId}/messages/stream`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ message }),
  });
  if (!response.ok || !response.body) throw new Error("The concierge could not respond. Please try again.");
  const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = "";
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    buffer += decoder.decode(value, { stream: true }); const events = buffer.split("\n\n"); buffer = events.pop() || "";
    for (const event of events) {
      const line = event.split("\n").find((item) => item.startsWith("data: ")); if (!line) continue;
      const payload = JSON.parse(line.slice(6));
      if (payload.type === "delta") handlers.onDelta(payload.content);
      if (payload.type === "done") handlers.onDone(payload);
    }
  }
}
