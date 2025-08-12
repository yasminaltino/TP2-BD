import { getSuprimentos } from "../repositories/SuprimentosRepository";

export async function buscarSuprimentos() {
  return await getSuprimentos();
}
