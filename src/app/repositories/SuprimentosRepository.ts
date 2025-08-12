import { pool } from "../../database/configDb";

export async function getSuprimentos() {
  const { rows } = await pool.query("SELECT * FROM Suprimento");
  return rows;
}
