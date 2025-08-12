import { Request, Response } from "express";
import * as suprimentoService from "../services/SuprimentoService";

export class SuprimentoController {
  static async listar(req: Request, res: Response) {
    try {
      const suprimentos = await suprimentoService.buscarSuprimentos();
      res.status(200).json(suprimentos);
    } catch (error) {
      console.error("Erro ao listar suprimentos:", error);
      res.status(500).json({ error: "Erro ao listar suprimentos" });
    }
  }
}
