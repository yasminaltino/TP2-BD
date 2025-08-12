import path from "path";
import fs from "fs";
import { pool } from "./configDb";

async function ensureMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) UNIQUE NOT NULL,
      run_on TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
}

export async function initDb() {
  try {
    await ensureMigrationsTable();

    const scriptsDir = path.join(__dirname, "scripts");
    const files = fs.readdirSync(scriptsDir).sort();

    for (const file of files) {
      const res = await pool.query(
        "SELECT 1 FROM migrations WHERE filename = $1",
        [file]
      );

      if (res.rowCount === 0) {
        const filePath = path.join(scriptsDir, file);
        const sqlContent = fs.readFileSync(filePath, "utf8");
        console.log(`Executando script: ${file}`);

        if (file.toLowerCase().includes("alter")) {
          // Executa o script inteiro de uma vez, sem dividir
          await pool.query(sqlContent);
        } else {
          // Divide e executa query por query
          const queries = sqlContent
            .split(";")
            .map((q) => q.trim())
            .filter((q) => q.length > 0);

          for (const query of queries) {
            await pool.query(query);
          }
        }

        await pool.query("INSERT INTO migrations(filename) VALUES($1)", [file]);
      } else {
        console.log(`Script já executado: ${file}, pulando.`);
      }
    }

    console.log("Banco de dados inicializado com sucesso!");
  } catch (err) {
    console.error("Erro ao inicializar banco:", err);
  }
}
