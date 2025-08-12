import { pool } from "../../database/configDb";

export class PessoaRepository {
  static async findByCpf(cpf: string) {
    const client = await pool.connect();
    try {
      const res = await client.query("SELECT * FROM Pessoa WHERE CPF = $1", [
        cpf,
      ]);
      return res.rows[0] || null; // retorna null se não achar
    } catch (error) {
      console.error("Erro ao buscar pessoa por CPF:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  static async deleteByCpf(cpf: string) {
    const client = await pool.connect();
    try {
      const res = await client.query(
        "DELETE FROM Pessoa WHERE CPF = $1 RETURNING *",
        [cpf]
      );
      return res.rows[0] || null;
    } catch (error) {
      console.error("Erro ao deletar pessoa por CPF:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
