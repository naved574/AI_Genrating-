import { Queue } from "bullmq";
import net from "net";

import { redisConnection } from "../config/redis";
import { logger } from "../shared/logger/logger";

export type GenerationJobPayload = {
  generationId: string;
};

let _generationQueue: Queue<GenerationJobPayload> | null = null;

function parseRedisHostPort(redisUrl: string) {
  try {
    const u = new URL(redisUrl);
    return { host: u.hostname, port: Number(u.port || 6379) };
  } catch (e) {
    return null;
  }
}

if (redisConnection && (redisConnection as any).url) {
  const parsed = parseRedisHostPort((redisConnection as any).url);
  if (parsed) {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.once("connect", () => {
      socket.destroy();
      try {
        _generationQueue = new Queue("generation", {
          connection: redisConnection,
          defaultJobOptions: {
            attempts: 3,
            backoff: {
              type: "exponential",
              delay: 5_000,
            },
            removeOnComplete: 500,
            removeOnFail: 500,
          },
        });
        logger.info("Generation queue connected to Redis");
      } catch (error) {
        logger.warn({ error }, "Failed to create generation queue after connect.");
        _generationQueue = null;
      }
    });

    socket.once("timeout", () => {
      logger.warn("Redis connection timed out; generation queue not created.");
      socket.destroy();
    });

    socket.once("error", (err) => {
      logger.warn({ err }, "Redis not reachable; generation queue not created.");
      socket.destroy();
    });

    socket.connect(parsed.port, parsed.host);
  } else {
    logger.warn("Unable to parse REDIS_URL; generation queue not created.");
  }
} else if (!redisConnection) {
  logger.warn("REDIS_URL is missing; generation queue not created.");
}

export const generationQueue = _generationQueue;
