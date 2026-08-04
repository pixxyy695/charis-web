import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { validateBody } from "../middlewares/validate";
import { create, list, getOne, reply, streamReply, replySchema } from "../controllers/consultationController";

const router = Router();

router.use(requireAuth);

router.post("/", create);
router.get("/", list);
router.get("/:id", getOne);
router.post("/:id/messages", validateBody(replySchema), reply);
router.post("/:id/messages/stream", validateBody(replySchema), streamReply);

export default router;
