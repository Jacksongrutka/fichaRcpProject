import { Ferimento } from "./ferimento/ferimento";

export interface Status{
    vidaAtual: number;
    vidaMax: number;
    energiaAtual: number;
    energiaMax: number;
    sanidadeAtual: number;
    sanidadeMax: number;
    ferimentos: Ferimento[];
}