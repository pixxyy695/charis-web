import { Schema } from "mongoose";

/**
 * Applied to every model so API responses expose a clean `id: string`
 * (matching the frontend's TypeScript types) instead of a raw Mongo
 * `_id` / `__v`. Keeps controllers and the frontend adapter layer free
 * of ad-hoc _id.toString() mapping.
 */
export function applyCleanJSON(schema: Schema) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret._id;
      return ret;
    },
  });
}
