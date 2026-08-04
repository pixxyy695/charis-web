import { apiFetch } from "./client";
import { SavedGift } from "@/types";

export const listSavedGifts = (token: string) =>
  apiFetch<{ savedGifts: SavedGift[] }>("/saved-gifts", { token });

export const saveGift = (token: string, productId: string, consultationId?: string, giftMessage?: string) =>
  apiFetch<{ savedGift: SavedGift }>("/saved-gifts", {
    method: "POST", token, body: { productId, consultationId, giftMessage },
  });

export const removeSavedGift = (token: string, id: string) =>
  apiFetch<void>(`/saved-gifts/${id}`, { method: "DELETE", token });
