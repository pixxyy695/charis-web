"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isAi = message.role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "max-w-[78%] rounded-2xl px-[1.125rem] py-3.5 text-[14.5px] leading-relaxed",
        isAi
          ? "self-start rounded-bl-md bg-[#2A2023] text-cream"
          : "self-end rounded-br-md bg-gradient-to-br from-wine to-burgundy-light text-warmwhite"
      )}
    >
      {message.content}
      <span className="mt-1.5 block text-[10px] text-muted">
        {message.timestamp}
      </span>
    </motion.div>
  );
}
