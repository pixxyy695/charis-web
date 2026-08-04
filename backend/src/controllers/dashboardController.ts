import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthedRequest } from "../middlewares/auth";
import { Consultation } from "../models/Consultation";
import { SavedGift } from "../models/SavedGift";
import { User } from "../models/User";

export const summary = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const [user, recentConsultations, savedGifts, totalConsultations, inProgress, completed, savedCount] = await Promise.all([
    User.findById(req.userId),
    Consultation.find({ user: req.userId }).sort({ updatedAt: -1 }).limit(5),
    SavedGift.find({ user: req.userId }).populate("product").sort({ createdAt: -1 }).limit(6),
    Consultation.countDocuments({ user: req.userId }),
    Consultation.countDocuments({ user: req.userId, status: "in_progress" }),
    Consultation.countDocuments({ user: req.userId, status: "complete" }),
    SavedGift.countDocuments({ user: req.userId }),
  ]);

  res.status(200).json({
    user,
    stats: {
      totalConsultations,
      inProgress,
      completed,
      savedGifts: savedCount,
    },
    recentConsultations,
    savedGifts,
  });
});
