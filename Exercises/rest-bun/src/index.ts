import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { createRoutes } from "./routes";
import { createDatabase } from "./database";

const greetings = () => "A long time ago in a galaxy far, far away....";

const db = await createDatabase();

// https://elysiajs.com/
export const app = new Elysia()
  .use(swagger())
  .use(createRoutes(db))
  .get("/", greetings)
  .listen(process.env.PORT ?? 3000);

console.log(
  `The API is running at http://${app.server?.hostname}:${app.server?.port}`
);
