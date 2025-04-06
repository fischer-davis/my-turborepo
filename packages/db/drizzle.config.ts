import { type Config } from "drizzle-kit";

export default {
  schema: "./schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:./db.sqlite",
  },
  tablesFilter: ["my-turborepo_*"],
} satisfies Config;
