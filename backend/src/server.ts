import { createApp } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

async function main() {
  await connectDB();
  const app = createApp();
  const server = app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`[server] CHARIS API listening on port ${env.port} (${env.nodeEnv})`);
  });

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      // eslint-disable-next-line no-console
      console.error(`[server] Port ${env.port} is already in use. Stop the stale backend process and retry.`);
    } else {
      // eslint-disable-next-line no-console
      console.error("[server] listen error", err);
    }

    process.exit(1);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("[server] fatal startup error", err);
  process.exit(1);
});
