import { Elysia, t } from "elysia";
import type { Database } from "./database";
import type { User } from "./types";

const getUser = (db: Database, id: number) => {
  return db.getUser(id);
};

const getUsers = (db: Database): User[] => {
  return db.getAllUsers();
};

export const createRoutes = (db: Database) => {
  const GetUserParams = t.Object({
    id: t.Numeric()
  });

  return new Elysia({ prefix: "/api" })
    .get("/users", () => {
      return getUsers(db);
    })
    .get("/users/:id", ({ params: { id }, error }) => {
      return getUser(db, id) ?? error(404);
    }, {
      params: GetUserParams
    });
};
