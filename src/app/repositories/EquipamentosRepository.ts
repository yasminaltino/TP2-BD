import { pool } from "../../database/configDb";

export async function getEquipamentos() {
  const { rows } = await pool.query("SELECT * FROM Equipamento");
  return rows;
}
