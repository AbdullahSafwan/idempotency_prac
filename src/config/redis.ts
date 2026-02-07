import { createClient } from "redis";
import config from "./env";

const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export const connectRedis = async () => {
  await redisClient.connect();
  console.log("Redis connected successfully");
};

export const disconnectRedis = async () => {
  await redisClient.quit();
  console.log("Redis disconnected");
};

export default redisClient;
