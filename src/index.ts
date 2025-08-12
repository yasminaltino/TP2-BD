import express, { json } from "express";
import * as path from "path";
import { initDb } from "./database/initDb";
import { routes } from "./app/routes/routes";

const app = express();
const port = 8080;

async function startServer() {
  try {
    await initDb();

    // Configura para servir arquivos estáticos
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(express.json());
    app.use(routes);

    app.listen(port, () => {
      console.log("Server rodando na porta", port);
      console.log(`Frontend disponível em: http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Erro na inicialização do servidor:", err);
    process.exit(1);
  }
}

startServer();
