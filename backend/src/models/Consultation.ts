import { Schema, model, Document, Types } from "mongoose";
import { applyCleanJSON } from "../utils/schemaPlugins";

export type ConsultationStatus = "in_progress" | "complete";

export interface ConsultationProfile {
  recipient?: string;
  relationship?: string;
  occasion?: string;
  budget?: string;
  personality?: string[];
  interests?: string[];
  lifestyle?: string;
  emotion?: string;
  story?: string;
}

export interface IConsultation extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  status: ConsultationStatus;
  profile: ConsultationProfile;
  recommendedProductIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const consultationSchema = new Schema<IConsultation>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    status: { type: String, enum: ["in_progress", "complete"], default: "in_progress" },
    profile: {
      recipient: String,
      relationship: String,
      occasion: String,
      budget: String,
      personality: { type: [String], default: [] },
      interests: { type: [String], default: [] },
      lifestyle: String,
      emotion: String,
      story: String,
    },
    recommendedProductIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

applyCleanJSON(consultationSchema);

export const Consultation = model<IConsultation>("Consultation", consultationSchema);
