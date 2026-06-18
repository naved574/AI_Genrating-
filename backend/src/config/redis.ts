import type { ConnectionOptions } from "bullmq";

import { env } from "./env";

export const redisConnection: ConnectionOptions | null = env.REDIS_URL
  ? {
      url: env.REDIS_URL,
      maxRetriesPerRequest: null,
    }
  : null;
