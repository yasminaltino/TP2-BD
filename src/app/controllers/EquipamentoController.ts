import { Request, Response } from "express";
import * as equipamentoService from "../services/EquipamentoService";

export class EquipamentoController {
  static async listar(req: Request, res: Response) {
    try {
      const equipamentos = await equipamentoService.buscarEquipamentos();
      res.status(200).json(equipamentos);
    } catch (error) {
      console.error("Erro ao listar equipamentos:", error);
      res.status(500).json({ error: "Erro ao listar equipamentos" });
    }
  }
}
