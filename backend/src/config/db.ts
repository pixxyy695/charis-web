import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB(): Promise<void> {
  mongoose.set("strictQuery", true);
  mongoose.set("bufferCommands", false);

  mongoose.connection.on("connected", () => {
    // eslint-disable-next-line no-console
    console.log(`[db] connected to MongoDB at ${maskUri(env.mongoUri)}`);
  });

  mongoose.connection.on("error", (err) => {
    // eslint-disable-next-line no-console
    console.error("[db] MongoDB connection error", err);
  });

  mongoose.connection.on("disconnected", () => {
    // eslint-disable-next-line no-console
    console.warn("[db] MongoDB connection lost");
  });

  mongoose.connection.on("reconnected", () => {
    // eslint-disable-next-line no-console
    console.warn("[db] MongoDB reconnected");
  });

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      heartbeatFrequencyMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 1,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[db] failed to connect to MongoDB", err);
    process.exit(1);
  }
}

function maskUri(uri: string): string {
  return uri.replace(/\/\/(.*):(.*)@/, "//***:***@");
}
