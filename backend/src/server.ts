import http from "http";

import { createApp } from "./app/app";
import { env } from "./config/env";
import { initSocket } from "./websockets/socket";
import { logger } from "./shared/logger/logger";

const app = createApp();
const server = http.createServer(app);

initSocket(server);

server.listen(env.PORT, () => {
  logger.info(`Backend listening on ${env.API_URL}`);
});

