import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { listProducts, getProductById } from "../services/recommendationService";
import { ApiError } from "../utils/ApiError";

export const list = asyncHandler(async (req, res: Response) => {
  const { category, search } = req.query as { category?: string; search?: string };
  const products = await listProducts({ category, search });
  res.status(200).json({ products });
});

export const getOne = asyncHandler(async (req, res: Response) => {
  const product = await getProductById(req.params.id);
  if (!product) throw ApiError.notFound("Product not found.");
  res.status(200).json({ product });
});
