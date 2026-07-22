import { Injectable } from '@angular/core';
import { Ficha } from '../models/ficha';
import { fichaVazia } from '../data/fichaVazia';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FichaService {

  private fichaSubject = new BehaviorSubject<Ficha>(fichaVazia);
  ficha$ = this.fichaSubject.asObservable();

  constructor() {
      this.carregarFicha();
    }

    setFicha(novaFicha: Ficha){
      this.fichaSubject.next(novaFicha)
    }
    
    getFicha(): Readonly<Ficha>{
      return structuredClone(this.fichaSubject.getValue());
    }

    resetFicha(){
      localStorage.removeItem("ficha");
      this.fichaSubject.next(structuredClone(fichaVazia));
      this.salvarFicha();
    }
    updateFicha(parcial: Partial<Ficha>){
      this.fichaSubject.next({ ...this.fichaSubject.getValue() , ...parcial });
      this.salvarFicha();
    }

    private salvarFicha(){
      localStorage.setItem(
        "ficha",
        JSON.stringify(this.fichaSubject.getValue())
      );
    };

    public carregarFicha(){
      const fichaSalvaJson = localStorage.getItem("ficha");

      if (fichaSalvaJson !== null){
        this.fichaSubject.next(JSON.parse(fichaSalvaJson));
      }
    };
     
}
