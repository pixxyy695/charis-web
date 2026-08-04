import { Router } from "express";
import authRoutes from "./auth.routes";
import consultationRoutes from "./consultation.routes";
import productRoutes from "./products.routes";
import giftMessageRoutes from "./giftMessages.routes";
import savedGiftRoutes from "./savedGifts.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({ status: "ok", service: "charis-api", message: "CHARIS backend is running" });
});

router.use("/auth", authRoutes);
router.use("/consultations", consultationRoutes);
router.use("/products", productRoutes);
router.use("/gift-messages", giftMessageRoutes);
router.use("/saved-gifts", savedGiftRoutes);
router.use("/dashboard", dashboardRoutes);

router.get("/health", (_req, res) => res.status(200).json({ status: "ok", service: "charis-api" }));

export default router;
