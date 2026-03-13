import { Ferimento } from "./ferimento/ferimento";

export interface Status{
    vida: number;
    energia: number;
    sanidade: number;
    ferimentos: Ferimento[];
}