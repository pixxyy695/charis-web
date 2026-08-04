"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useConsultationStore } from "@/store/consultationStore";
import { useAuthStore } from "@/store/authStore";
import { getNextConciergeTurn } from "@/lib/ai/mockAiService";
import * as consultationsApi from "@/lib/api/consultations";
import { MessageBubble } from "./MessageBubble";
import { QuickReplies } from "./QuickReplies";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "@/types";

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function makeMessage(role: ChatMessage["role"], content: string, quickReplies?: string[]): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: timestamp(),
    quickReplies,
  };
}

export function ChatWindow() {
  const {
    consultationId,
    messages,
    profile,
    status,
    isTyping,
    setConsultationId,
    addMessage,
    setMessages,
    updateMessage,
    setTyping,
    setProfile,
    setRecommendations,
    complete,
    reset,
  } = useConsultationStore();
  const token = useAuthStore((s) => s.token);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLive = !!token;

  const [pendingReplies, setPendingReplies] = useState<string[]>([]);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  async function runMockTurn(history: ChatMessage[]) {
    setTyping(true);
    setPendingReplies([]);
    const turn = await getNextConciergeTurn(history, profile);
    setTyping(false);
    setProfile(turn.updatedProfile);
    addMessage(makeMessage("ai", turn.reply, turn.quickReplies));
    setPendingReplies(turn.quickReplies);
    if (turn.isComplete) complete();
  }

  async function startLiveConsultation() {
    reset();
    setTyping(true);
    try {
      const consultation = await consultationsApi.startConsultation(token!);
      setConsultationId(consultation.id);
      consultation.messages.forEach(addMessage);
    } catch (err) {
      setConnectionError((err as Error).message);
    } finally {
      setTyping(false);
    }
  }

  async function sendLiveReply(text: string) {
    if (!consultationId) return;
    setTyping(true);
    try {
      const streamId = crypto.randomUUID();
      addMessage({ id: streamId, role: "ai", content: "", timestamp: timestamp() });
      let content = "";
      await consultationsApi.streamReply(token!, consultationId, text, {
        onDelta: (delta) => { content += delta; updateMessage(streamId, content.replace("CONSULTATION_COMPLETE", "").trimStart()); },
        onDone: (result) => {
          updateMessage(streamId, result.text);
          if (result.complete) { setRecommendations(result.recommendations); complete(); setTimeout(() => router.push("/recommendations"), 650); }
        },
      });
    } catch (err) {
      setConnectionError((err as Error).message);
    } finally {
      setTyping(false);
    }
  }

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (isLive) {
      const existingId = searchParams.get("id");
      if (existingId) {
        consultationsApi.getConsultation(token!, existingId).then((consultation) => {
          setConsultationId(consultation.id); setMessages(consultation.messages); setProfile(consultation.profile);
          if (consultation.status === "complete") complete();
        }).catch((err) => setConnectionError((err as Error).message));
      } else startLiveConsultation();
    } else {
      runMockTurn([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUserReply(text: string) {
    if (!text.trim() || status === "complete") return;
    const userMsg = makeMessage("user", text);
    const nextHistory = [...messages, userMsg];
    addMessage(userMsg);
    setPendingReplies([]);
    if (isLive) {
      await sendLiveReply(text);
    } else {
      await runMockTurn(nextHistory);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-charcoal shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#7A2340,#3D0F21)] font-display italic text-gold-soft">
            C
          </div>
          <div>
            <div className="text-sm text-warmwhite">CHARIS</div>
            <div className="text-[11.5px] text-muted">
              {status === "complete" ? "Consultation complete" : "Your gifting concierge"}
            </div>
          </div>
        </div>
        {!isLive && (
          <span className="rounded-full border border-white/[0.1] px-3 py-1 text-[10.5px] uppercase tracking-wide text-muted">
            Demo mode
          </span>
        )}
      </div>

      <div
        ref={bodyRef}
        className="flex min-h-[340px] flex-col gap-4 overflow-y-auto px-6 py-6"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {isTyping && <TypingIndicator key="typing" />}
        </AnimatePresence>

        {connectionError && (
          <div className="self-center rounded-md border border-[#E8A9A9]/30 px-4 py-2 text-[12px] text-[#E8A9A9]">
            {connectionError}
          </div>
        )}

        {status === "complete" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 self-center rounded-full border border-gold/30 px-5 py-2 text-[12px] tracking-wide text-gold-soft"
          >
            Your shortlist is ready
          </motion.div>
        )}
      </div>

      <QuickReplies replies={isLive || status === "complete" ? [] : pendingReplies} onSelect={handleUserReply} />
      <ChatInput onSend={handleUserReply} disabled={status === "complete" || isTyping} />
    </div>
  );
}
