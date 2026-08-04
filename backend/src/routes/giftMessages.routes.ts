import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { validateBody } from "../middlewares/validate";
import { generate, improve, generateSchema, improveSchema } from "../controllers/giftMessageController";

const router = Router();

router.use(requireAuth);

router.post("/generate", validateBody(generateSchema), generate);
router.post("/improve", validateBody(improveSchema), improve);

export default router;
