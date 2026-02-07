import { createClient } from "redis";
import config from "./env";

const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export default redisClient;
