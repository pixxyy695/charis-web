"use client";

import { motion } from "framer-motion";

interface QuickRepliesProps {
  replies: string[];
  onSelect: (reply: string) => void;
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  if (replies.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 px-6 pb-5" role="group" aria-label="Suggested replies">
      {replies.map((reply, i) => (
        <motion.button
          key={reply}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.35 }}
          onClick={() => onSelect(reply)}
          className="rounded-full border border-gold/35 px-4 py-2 text-[13px] text-gold-soft transition-colors hover:bg-gold-soft hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-soft"
        >
          {reply}
        </motion.button>
      ))}
    </div>
  );
}
