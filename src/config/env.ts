import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  redisUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || "development",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
};

export default config;
