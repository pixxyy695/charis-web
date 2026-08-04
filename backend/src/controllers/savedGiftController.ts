import { Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthedRequest } from "../middlewares/auth";
import { saveGift, listSavedGifts, removeSavedGift } from "../services/savedGiftService";

export const saveSchema = z.object({
  productId: z.string().min(1),
  consultationId: z.string().optional(),
  giftMessage: z.string().optional(),
});

export const save = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const { productId, consultationId, giftMessage } = req.body;
  const saved = await saveGift(req.userId!, productId, consultationId, giftMessage);
  res.status(201).json({ savedGift: saved });
});

export const list = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const savedGifts = await listSavedGifts(req.userId!);
  res.status(200).json({ savedGifts });
});

export const remove = asyncHandler(async (req: AuthedRequest, res: Response) => {
  await removeSavedGift(req.userId!, req.params.id);
  res.status(204).send();
});
