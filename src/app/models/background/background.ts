import { Aparencia } from "./aparencia/aparencia";
import { PessoaImportante } from "./pessoaImportante/pessoaImportante";

export interface Background{
    aparencia: Aparencia;
    historia: string;
    pessoasImportantes: PessoaImportante[];
    traumas: string;
    ancoras: string;
}