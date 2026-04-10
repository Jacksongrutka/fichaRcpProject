import { InforcacoesDoPersonagem } from "./informacaoPersonagem/informacoesDoPersonagem";
import { Atributos } from "./atributos";
import { Status } from "./status/status";
import { Pericia } from "./pericia/pericia";
import { Bonus } from "./bonus/bonus";
import { Ataques } from "./ataques";

export interface Personagem{
    informacaoPersonagem: InforcacoesDoPersonagem;
    atributos: Atributos;
    status: Status;
    pericias: Pericia[];
    bonus: Bonus;
    ataques: Ataques;
}