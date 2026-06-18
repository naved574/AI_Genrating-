import { Worker } from "bullmq";
import net from "net";

import { redisConnection } from "../config/redis";
import { logger } from "../shared/logger/logger";
import type { GenerationJobPayload } from "./generation.queue";
import { processGenerationJob } from "../modules/generations/generations.worker";

function parseRedisHostPort(redisUrl: string) {
  try {
    const u = new URL(redisUrl);
    return { host: u.hostname, port: Number(u.port || 6379) };
  } catch (e) {
    return null;
  }
}

if (!redisConnection) {
  logger.warn("REDIS_URL is missing; generation worker did not start.");
} else if ((redisConnection as any).url) {
  const parsed = parseRedisHostPort((redisConnection as any).url);
  if (parsed) {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.once("connect", () => {
      socket.destroy();
      try {
        const worker = new Worker<GenerationJobPayload>(
          "generation",
          async (job) => {
            await processGenerationJob(job.data.generationId, job.id ?? undefined);
          },
          { connection: redisConnection, concurrency: 3 },
        );

        worker.on("completed", (job) => {
          logger.info({ jobId: job.id }, "generation job completed");
        });

        worker.on("failed", (job, error) => {
          logger.error({ jobId: job?.id, error }, "generation job failed");
        });

        logger.info("Generation worker started and connected to Redis");
      } catch (error) {
        logger.warn({ error }, "Failed to start generation worker after connect.");
      }
    });

    socket.once("timeout", () => {
      logger.warn("Redis connection timed out; generation worker not started.");
      socket.destroy();
    });

    socket.once("error", (err) => {
      logger.warn({ err }, "Redis not reachable; generation worker not started.");
      socket.destroy();
    });

    socket.connect(parsed.port, parsed.host);
  } else {
    logger.warn("Unable to parse REDIS_URL; generation worker not started.");
  }
}
