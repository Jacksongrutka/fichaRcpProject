import { Resistencia } from "./resistencia/resistencia";
import { OutrosBonus } from "./outros/outros";

export interface Bonus{
    bonusCorpoACorpo: number;
    resistencias: Resistencia[];
    OutrosBonus: OutrosBonus[];
}