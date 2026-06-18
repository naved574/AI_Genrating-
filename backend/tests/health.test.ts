import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../src/app/app";

describe("health route", () => {
  it("returns service status", async () => {
    const response = await request(createApp()).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.service).toBe("ai-generator-backend");
  });
});
