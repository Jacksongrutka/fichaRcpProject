import { Treinamento } from "./treinamento/treinamento";

export interface InforcacoesDoPersonagem {
    nome: string;
    rankAgente: string;
    idade: number;
    sexo: string;
    treinamentos:Treinamento[];
}