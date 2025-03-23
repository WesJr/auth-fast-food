import * as express from "express";
import * as cors from "cors";
import * as dotenv from 'dotenv';
import router from "./routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite JSON no body das requisições
app.use(router);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} 🚀`);
});
