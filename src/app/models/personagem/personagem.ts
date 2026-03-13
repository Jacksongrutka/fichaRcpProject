import { InforcacoesDoPersonagem } from "./informacaoPersonagem/informacoesDoPersonagem";
import { Atributos } from "./atributos";
import { Status } from "./status/status";
import { Pericias } from "./pericias/pericias";
import { Bonus } from "./bonus/bonus";
import { Ataques } from "./ataques";

export interface Personagem{
    informacaoPersonagem: InforcacoesDoPersonagem;
    atributos: Atributos;
    status: Status;
    pericias: Pericias;
    bonus: Bonus;
    ataques: Ataques;
}