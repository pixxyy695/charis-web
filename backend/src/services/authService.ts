import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { signToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

const SALT_ROUNDS = 10;

export async function registerUser(name: string, email: string, password: string) {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw ApiError.conflict("An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ name, email: email.toLowerCase(), passwordHash });

  const token = signToken({ sub: user._id.toString(), email: user.email });
  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password.");
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    throw ApiError.unauthorized("Invalid email or password.");
  }

  const token = signToken({ sub: user._id.toString(), email: user.email });
  return { user, token };
}
