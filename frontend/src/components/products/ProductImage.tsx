"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { getProductImage, PRODUCT_IMAGE_FALLBACK } from "@/lib/data/productImages";
import { Product } from "@/types";

type ProductImageProps = Omit<ImageProps, "src" | "alt"> & {
  product: Pick<Product, "name" | "images">;
  alt?: string;
};

export function ProductImage({ product, alt, ...imageProps }: ProductImageProps) {
  const resolvedImage = getProductImage(product);
  const [src, setSrc] = useState(resolvedImage);

  useEffect(() => setSrc(resolvedImage), [resolvedImage]);

  return (
    <Image
      {...imageProps}
      src={src}
      alt={alt || product.name}
      onError={() => setSrc(PRODUCT_IMAGE_FALLBACK)}
    />
  );
}
