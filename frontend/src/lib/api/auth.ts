import { apiFetch } from "./client";
import { User } from "@/types";

interface AuthResponse {
  user: User;
  token: string;
}

export function register(name: string, email: string, password: string) {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
}

export function login(email: string, password: string) {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function me(token: string) {
  return apiFetch<{ user: User }>("/auth/me", { token });
}
