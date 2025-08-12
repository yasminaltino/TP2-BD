import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.POSTGRESDB_USER,
  host: "localhost",
  database: process.env.POSTGRESDB_NAME,
  password: process.env.POSTGRESDB_PASSWORD,
  port: 5432,
});
