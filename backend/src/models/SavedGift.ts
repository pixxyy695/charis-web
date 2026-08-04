import { Schema, model, Document, Types } from "mongoose";
import { applyCleanJSON } from "../utils/schemaPlugins";

export interface ISavedGift extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  product: Types.ObjectId;
  consultation?: Types.ObjectId;
  giftMessage?: string;
  createdAt: Date;
}

const savedGiftSchema = new Schema<ISavedGift>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    consultation: { type: Schema.Types.ObjectId, ref: "Consultation" },
    giftMessage: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

savedGiftSchema.index({ user: 1, product: 1 }, { unique: true });

applyCleanJSON(savedGiftSchema);

export const SavedGift = model<ISavedGift>("SavedGift", savedGiftSchema);
