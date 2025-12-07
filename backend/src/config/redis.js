import { Redis } from "@upstash/redis";
import { ENV } from "./env.js";

let redisClient;

export function connectRedis() {
  redisClient = new Redis({
    url: ENV.REDIS_URL,       
    token: ENV.REDIS_TOKEN  
  });

  console.log("Upstash Redis Client Initialized");
  return redisClient;
}

export function getRedis() {
  if (!redisClient) {
    throw new Error("Redis client not initialized.");
  }
  return redisClient;
}
