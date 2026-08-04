"use client";

import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit();
  }

  return (
    <div className="flex items-center gap-2.5 border-t border-white/[0.06] px-5 py-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type your reply…"
        aria-label="Message CHARIS"
        className="flex-1 rounded-full border border-white/[0.08] bg-[#221A1D] px-[1.125rem] py-3 text-sm text-cream placeholder:text-muted focus:border-gold-soft focus:outline-none disabled:opacity-50"
      />
      <button
        onClick={submit}
        disabled={disabled}
        aria-label="Send message"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#7A2340,#3D0F21)] transition-transform duration-300 ease-out hover:-rotate-6 hover:scale-105 disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[1.125rem] w-[1.125rem]">
          <path
            d="M12 2 L14 9 L21 9 L15.5 13 L17.5 20 L12 16 L6.5 20 L8.5 13 L3 9 L10 9 Z"
            fill="#E3CD97"
          />
        </svg>
      </button>
    </div>
  );
}
