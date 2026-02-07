import { Request, Response } from "express";
import redisClient from "./config/redis";

async function whenIdempotent<T>(idempotentKey: string, func: () => Promise<T>): Promise<T> {
  // check if we have already done this
  const cachedValue = await redisClient.get("idempotency:" + idempotentKey);
  if (cachedValue) {
    console.log("Duplicate request for key " + idempotentKey + " Returning cached result.");
    return JSON.parse(cachedValue);
  }

  // if not, then do the operation (charge the card for example)
  const value = await func();

  // save the value for later retry. expiry set to 24 hours (86400 seconds)
  await redisClient.set("idempotency:" + idempotentKey, JSON.stringify(value), {
    EX: 86400,
  });

  console.log("Completed operation for key " + idempotentKey + " and cached the result.");

  return value;
}

export const handleRequest = async (req: Request, res: Response) => {
  try {
    const idempotentKey = req.headers["idempotency-key"] as string;
    if (!idempotentKey) {
      return res.status(400).json({ error: "Idempotency-Key header is required" });
    }

    const result = await whenIdempotent(idempotentKey, async () => {
      // dummy function
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { success: true, message: "Operation completed successfully" };
    });

    res.json(result);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const controller = {
  handleRequest,
};

export default controller;
