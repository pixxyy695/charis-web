import { SavedGift } from "../models/SavedGift";
import { ApiError } from "../utils/ApiError";

export async function saveGift(userId: string, productId: string, consultationId?: string, giftMessage?: string) {
  try {
    return await SavedGift.create({ user: userId, product: productId, consultation: consultationId, giftMessage });
  } catch (err: any) {
    if (err?.code === 11000) {
      throw ApiError.conflict("This gift is already saved.");
    }
    throw err;
  }
}

export async function listSavedGifts(userId: string) {
  return SavedGift.find({ user: userId }).populate("product").sort({ createdAt: -1 });
}

export async function removeSavedGift(userId: string, savedGiftId: string) {
  const result = await SavedGift.findOneAndDelete({ _id: savedGiftId, user: userId });
  if (!result) throw ApiError.notFound("Saved gift not found.");
  return result;
}
