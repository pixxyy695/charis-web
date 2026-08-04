import { apiFetch } from "./client";
import { Product } from "@/types";

export function listProducts(params?: { category?: string; search?: string }) {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.search) query.set("search", params.search);
  const qs = query.toString();
  return apiFetch<{ products: Product[] }>(`/products${qs ? `?${qs}` : ""}`);
}

export function getProduct(id: string) {
  return apiFetch<{ product: Product }>(`/products/${id}`);
}
