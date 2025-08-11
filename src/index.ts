import express from "express";
import * as path from "path";

const app = express();
const port = 8080;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Your API routes will go here
// Example: app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log("Server rodando na porta", port);
  console.log(`Frontend disponível em: http://localhost:${port}`);
});
