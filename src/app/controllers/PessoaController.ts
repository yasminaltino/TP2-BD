import { Request, Response } from "express";
import { PessoaService } from "../services/PessoaService";

export class PessoaController {
  static async mostrarPorCpf(req: Request, res: Response) {
    try {
      const { cpf } = req.params;

      if (!cpf) {
        return res.status(400).json({ error: "CPF é obrigatório" });
      }

      const pessoa = await PessoaService.buscarPorCpf(cpf);
      res.status(200).json(pessoa);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar pessoa" });
    }
  }

  static async deletarPorCpf(req: Request, res: Response) {
    try {
      const { cpf } = req.params;
      if (!cpf) {
        return res.status(400).json({ error: "CPF é obrigatório" });
      }
      await PessoaService.deletarPorCpf(cpf);
      res.status(200).json({ message: "Pessoa deletada" });
    } catch (err) {
      res.status(500).json({ error: "Erro ao deletar pessoa" });
    }
  }
}
