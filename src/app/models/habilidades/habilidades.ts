import { Evolucao } from "./evolucao/evolucao";
import { Poder } from "./poderes/poder";
import { Ritual } from "./rituais/ritual";

export interface Habilidades{
    evolucao: Evolucao;
    poderes: Poder[];
    rituais: Ritual[];
}