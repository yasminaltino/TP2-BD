import { pool } from "../../database/configDb";
import { IFuncionarioCompleto } from "../interfaces/IFuncionarioCompleto";

export async function createFuncionario(
  funcionarioCompleto: IFuncionarioCompleto
) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO Pessoa (CPF, Nome, Sexo, Telefone, CEP, Cidade, Logradouro, Numero)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        funcionarioCompleto.cpf,
        funcionarioCompleto.nome,
        funcionarioCompleto.sexo ?? null,
        funcionarioCompleto.telefone ?? null,
        funcionarioCompleto.cep ?? null,
        funcionarioCompleto.cidade ?? null,
        funcionarioCompleto.logradouro ?? null,
        funcionarioCompleto.numero ?? null,
      ]
    );

    await client.query(
      `INSERT INTO Funcionario (CPF_Funcionario, RegistroFunc, DataContratacao)
       VALUES ($1, $2, $3)`,
      [
        funcionarioCompleto.cpf,
        funcionarioCompleto.registroFunc,
        funcionarioCompleto.dataContratacao,
      ]
    );

    await client.query("COMMIT");
    return { success: true, message: "Funcionário criado com sucesso" };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao criar funcionário:", error);
    return { success: false, message: "Erro ao criar funcionário", error };
  } finally {
    client.release();
  }
}

export async function getFuncionariosByNomeDepartamento(
  nomeDepartamento: string
) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      SELECT f.CPF_Funcionario, f.RegistroFunc, f.DataContratacao,
             p.Nome, p.Sexo, p.Telefone, p.CEP, p.Cidade, p.Logradouro, p.Numero,
             d.Nome AS nome_departamento
      FROM Funcionario f
      INNER JOIN Pessoa p ON p.CPF = f.CPF_Funcionario
      INNER JOIN Atua_Em ae ON ae.CPF_Funcionario = f.CPF_Funcionario
      INNER JOIN Departamento d ON d.Codigo = ae.Codigo_Departamento
      WHERE d.Nome ILIKE $1
      `,
      [`%${nomeDepartamento}%`] // Busca case-insensitive com LIKE
    );

    return result.rows; // retorna lista de funcionários
  } catch (error) {
    console.error(
      "Erro ao buscar funcionários por nome do departamento:",
      error
    );
    throw new Error("Erro ao buscar funcionários por nome do departamento");
  } finally {
    client.release();
  }
}
