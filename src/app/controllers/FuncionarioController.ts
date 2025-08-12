import { Request, Response } from "express";
import * as funcionarioService from "../services/FuncionarioService";

export class FuncionarioController {
  static async cadastrar(req: Request, res: Response) {
    try {
      await funcionarioService.criarFuncionario(req.body);
      res.status(201).json({ message: "Funcionário cadastrado" });
    } catch (err) {
      console.error("Erro ao cadastrar funcionário:", err);
      res.status(500).json({ error: "Erro ao cadastrar funcionário" });
    }
  }

  static async mostrarPorDepartamento(req: Request, res: Response) {
    try {
      const { nome } = req.params;
      if (!nome) {
        return res
          .status(400)
          .json({ message: "Erro: nome do departamento é necessário!" });
      }
      const pessoas = await funcionarioService.mostrarPorDepartamento(nome);
      res.status(200).json(pessoas);
    } catch (err) {
      console.error("Erro ao buscar funcionário:", err);
      res.status(500).json({ error: "Erro ao buscar funcionários" });
    }
  }
}
