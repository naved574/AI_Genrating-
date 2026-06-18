import type { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";

import { env } from "../config/env";
import { logger } from "../shared/logger/logger";

export let io: Server | null = null;

export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token as string | undefined;
    if (!token) return next(new Error("Missing auth token"));
    try {
      const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as { sub: string };
      void socket.join(`user:${payload.sub}`);
      socket.data.userId = payload.sub;
      next();
    } catch {
      next(new Error("Invalid auth token"));
    }
  });

  io.on("connection", (socket) => {
    logger.info({ socketId: socket.id, userId: socket.data.userId }, "socket connected");
  });

  return io;
}

export function emitToUser(userId: string, event: string, payload: unknown) {
  io?.to(`user:${userId}`).emit(event, payload);
}
