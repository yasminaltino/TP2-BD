import { pool } from "../../database/configDb";
import { ICandidatoCompleto } from "../interfaces/ICandidato";

export async function createCandidato(candidatoCompleto: ICandidatoCompleto) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO Pessoa (CPF, Nome, Sexo, Telefone, CEP, Cidade, Logradouro, Numero)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        candidatoCompleto.cpf,
        candidatoCompleto.nome,
        candidatoCompleto.sexo ?? null,
        candidatoCompleto.telefone ?? null,
        candidatoCompleto.cep ?? null,
        candidatoCompleto.cidade ?? null,
        candidatoCompleto.logradouro ?? null,
        candidatoCompleto.numero ?? null,
      ]
    );

    await client.query(
      `INSERT INTO Candidato (CPF_Candidato, RegistroCand)
        VALUES ($1, $2)`,
      [candidatoCompleto.cpf, candidatoCompleto.registroCand]
    );

    await client.query("COMMIT");
    return { success: true, message: "Candidato criado com sucesso" };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao criar candidato:", error);
    return { success: false, message: "Erro ao criar candidato", error };
  } finally {
    client.release();
  }
}
