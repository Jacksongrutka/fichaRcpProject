import { Personagem } from "./personagem/personagem";
import { Habilidades } from "./habilidades/habilidades";
import { Inventario } from "./inventario/inventario";
import { Background } from "./background/background";
import { Notas } from "./notas";

export interface Ficha {
  personagem: Personagem;
  habilidades: Habilidades;
  inventario: Inventario;
  background: Background;
  notas: Notas;
}