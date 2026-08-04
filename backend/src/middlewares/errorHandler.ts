import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: { message: `Route not found: ${req.method} ${req.originalUrl}` } });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: { message: err.message, details: err.details ?? undefined },
    });
  }

  // eslint-disable-next-line no-console
  console.error("[unhandled error]", err);

  res.status(500).json({
    error: {
      message: "Something went wrong on our end.",
      stack: env.nodeEnv === "development" && err instanceof Error ? err.stack : undefined,
    },
  });
}
