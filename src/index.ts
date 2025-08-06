import express from "express";

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log("Server rodando na porta", port);
});
