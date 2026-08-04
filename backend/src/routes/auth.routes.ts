import { Router } from "express";
import { register, login, me, registerSchema, loginSchema } from "../controllers/authController";
import { validateBody } from "../middlewares/validate";
import { requireAuth } from "../middlewares/auth";
import { authRateLimiter } from "../middlewares/rateLimiter";

const router = Router();

router.post("/register", authRateLimiter, validateBody(registerSchema), register);
router.post("/login", authRateLimiter, validateBody(loginSchema), login);
router.get("/me", requireAuth, me);

export default router;
