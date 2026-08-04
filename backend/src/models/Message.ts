import { Schema, model, Document, Types } from "mongoose";
import { applyCleanJSON } from "../utils/schemaPlugins";

export type MessageRole = "user" | "assistant";

export interface IMessage extends Document {
  _id: Types.ObjectId;
  consultation: Types.ObjectId;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    consultation: { type: Schema.Types.ObjectId, ref: "Consultation", required: true, index: true },
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

applyCleanJSON(messageSchema);

export const Message = model<IMessage>("Message", messageSchema);
