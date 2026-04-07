import { Injectable } from '@angular/core';
import { Ficha } from '../models/ficha';
import { fichaVazia } from '../data/fichaVazia';


@Injectable({
  providedIn: 'root'
})

export class FichaService {

  private ficha: Ficha =  { ... fichaVazia };
  

  constructor( ) {}

    setFicha(novaFicha: Ficha){
      this.ficha = novaFicha;
    }
    
    getFicha(): Readonly<Ficha>{
      return structuredClone(this.ficha);
    }

    resetFicha(){
      this.ficha = { ... fichaVazia };
    }
    updateFicha(parcial: Partial<Ficha>){
      this.ficha = { ...this.ficha , ...parcial };
    }
     
}
