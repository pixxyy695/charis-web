import mongoose from "mongoose";
import { env } from "../config/env";
import { Product } from "../models/Product";
import productsData from "./products.data.json";

async function seed() {
  await mongoose.connect(env.mongoUri);
  // eslint-disable-next-line no-console
  console.log(`[seed] connected to ${env.mongoUri}`);

  await Product.deleteMany({});
  // eslint-disable-next-line no-console
  console.log("[seed] cleared existing products");

  const inserted = await Product.insertMany(productsData as any[]);
  // eslint-disable-next-line no-console
  console.log(`[seed] inserted ${inserted.length} products`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("[seed] failed", err);
  process.exit(1);
});
