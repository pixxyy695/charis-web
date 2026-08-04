import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { summary } from "../controllers/dashboardController";

const router = Router();

router.use(requireAuth);
router.get("/summary", summary);

export default router;
