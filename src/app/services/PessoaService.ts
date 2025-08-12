import { PessoaRepository } from "../repositories/PessoaRepository";

export class PessoaService {
  static async buscarPorCpf(cpf: string) {
    const pessoa = await PessoaRepository.findByCpf(cpf);
    if (!pessoa) {
      throw new Error("Pessoa não encontrada!");
    }
    return pessoa;
  }

  static async deletarPorCpf(cpf: string) {
    const pessoaDeletada = await PessoaRepository.deleteByCpf(cpf);
    if (!pessoaDeletada) {
      throw new Error("Pessoa não encontrada para deletar!");
    }
    return pessoaDeletada;
  }
}
