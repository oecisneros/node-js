import type { ExtractInstanceType, User } from "./types";

type People = Omit<User, "id">;

type SwapiResponse = { results: People[] };

const asJson = <T>(response: Response) => response.json() as T;

const throwError = (message: string) => (reason: any) => {
  throw new Error(`${message}:${reason}`);
};

const convertToUsers = (response: SwapiResponse): User[] =>
  response.results.map((people, index) => ({
    id: ++index,
    name: people.name,
    height: people.height,
    gender: people.gender,
  }));

class InternalDatabase {
  private users: User[];

  private constructor(users: User[]) {
    this.users = users;
  }

  static create(users: User[]): Database {
    return Object.freeze(new InternalDatabase(users));
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUser(id: number): User | undefined {
    return this.users.find((x) => x.id === id);
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((x) => x.id !== id);
  }
}

export type Database = Readonly<ExtractInstanceType<typeof InternalDatabase>>;

export const createDatabase = async (): Promise<Database> => {
  return fetch("https://swapi.dev/api/people")
    .then(asJson<Promise<SwapiResponse>>)
    .then(convertToUsers)
    .then(InternalDatabase.create)
    .catch(throwError("Unable to connect to the database."));
};
