import { describe, expect, it } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { app } from "../src/index";

const api = treaty(app);

describe("Elysia", () => {
  it("return a response", async () => {
    const { data, error } = await api.index.get();

    expect(data).toBe("A long time ago in a galaxy far, far away....");
  });
});
