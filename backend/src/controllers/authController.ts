import { Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { registerUser, loginUser } from "../services/authService";
import { AuthedRequest } from "../middlewares/auth";
import { User } from "../models/User";

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const register = asyncHandler(async (req, res: Response) => {
  const { name, email, password } = req.body;
  const { user, token } = await registerUser(name, email, password);
  res.status(201).json({ user, token });
});

export const login = asyncHandler(async (req, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser(email, password);
  res.status(200).json({ user, token });
});

export const me = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const user = await User.findById(req.userId);
  res.status(200).json({ user });
});
