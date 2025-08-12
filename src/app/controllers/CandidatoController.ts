import { Request, Response } from "express";
import * as candidatoService from "../services/CandidatoService";

export class CandidatoController {
  static async cadastrar(req: Request, res: Response) {
    try {
      await candidatoService.criarCandidato(req.body);
      res.status(201).json({ message: "Candidato cadastrado" });
    } catch (err) {
      res.status(500).json({ error: "Erro ao cadastrar candidato" });
    }
  }
}
