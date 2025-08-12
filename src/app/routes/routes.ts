import { Router } from "express";
import { FuncionarioController } from "../controllers/FuncionarioController";
import { CandidatoController } from "../controllers/CandidatoController";
import { PessoaController } from "../controllers/PessoaController";
import { EquipamentoController } from "../controllers/EquipamentoController";
import { SuprimentoController } from "../controllers/SuprimentoController";

const routes = Router();

routes.post("/funcionarios", FuncionarioController.cadastrar);
routes.post("/candidatos", CandidatoController.cadastrar);

routes.get("/pessoas/:cpf", PessoaController.mostrarPorCpf);
routes.get("/equipamentos", EquipamentoController.listar);
routes.get("/suprimentos", SuprimentoController.listar);
routes.get("/funcionarios/:nome", FuncionarioController.mostrarPorDepartamento);

routes.delete("/pessoas/:cpf", PessoaController.deletarPorCpf);
export { routes };
