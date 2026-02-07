import app from "./app";
import config from "./config/env";
import { connectRedis, disconnectRedis } from "./config/redis";

const port = config.port;

const start = async () => {
  try {
    await connectRedis();

    app.listen(port, () => {
      console.log("listening to port", port);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  await disconnectRedis();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\nShutting down gracefully...");
  await disconnectRedis();
  process.exit(0);
});

start();

export default app;
