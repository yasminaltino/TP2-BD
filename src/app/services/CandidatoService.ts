import { createCandidato } from "../repositories/CandidatosRepository";

export async function criarCandidato(candidatoData: any) {
  return await createCandidato(candidatoData);
}
