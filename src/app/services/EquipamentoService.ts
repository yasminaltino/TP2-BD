import { getEquipamentos } from "../repositories/EquipamentosRepository";

export async function buscarEquipamentos() {
  return await getEquipamentos();
}
