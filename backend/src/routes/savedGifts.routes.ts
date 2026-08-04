import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { validateBody } from "../middlewares/validate";
import { save, list, remove, saveSchema } from "../controllers/savedGiftController";

const router = Router();

router.use(requireAuth);

router.post("/", validateBody(saveSchema), save);
router.get("/", list);
router.delete("/:id", remove);

export default router;
