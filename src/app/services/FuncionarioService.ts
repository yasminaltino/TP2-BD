import {
  createFuncionario,
  getFuncionariosByNomeDepartamento,
} from "../repositories/FuncionariosRepository";

export async function criarFuncionario(funcionarioData: any) {
  return await createFuncionario(funcionarioData);
}

export async function mostrarPorDepartamento(nomeDepartamento: string) {
  return await getFuncionariosByNomeDepartamento(nomeDepartamento);
}
