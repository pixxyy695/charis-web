import { Schema, model, Document, Types } from "mongoose";
import { applyCleanJSON } from "../utils/schemaPlugins";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  story: string;
  symbolicMeaning: string;
  deliveryEstimate: string;
  images: string[];
  tags: {
    relationship: string[];
    occasion: string[];
    personality: string[];
    interests: string[];
    emotion: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    story: { type: String, required: true },
    symbolicMeaning: { type: String, required: true },
    deliveryEstimate: { type: String, required: true, default: "5-7 business days" },
    images: { type: [String], default: [] },
    tags: {
      relationship: { type: [String], default: [] },
      occasion: { type: [String], default: [] },
      personality: { type: [String], default: [] },
      interests: { type: [String], default: [] },
      emotion: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

productSchema.index({ category: 1 });
productSchema.index({ "tags.relationship": 1 });
productSchema.index({ "tags.occasion": 1 });

applyCleanJSON(productSchema);

export const Product = model<IProduct>("Product", productSchema);
