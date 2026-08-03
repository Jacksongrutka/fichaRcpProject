import { Injectable } from '@angular/core';
import { Ficha } from '../../models/ficha';
import { fichaVazia } from '../../data/fichaVazia';
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

    public downloadFicha(){
      const json = JSON.stringify(this.fichaSubject.getValue(), null ,2);

      const blob = new Blob([json], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const nome = this.fichaSubject.getValue().personagem.informacaoPersonagem.nome || 'SemNome';
      a.download = `Ficha-${nome}.json`;
      a.click();

      URL.revokeObjectURL(url);
    };
    public uploadFicha(){
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json, application/json';

      input.onchange = async () => {
        const file = input.files?.[0];
          if(!file){
            return;
          }
      const texto = await file.text();

      const ficha = this.lerFicha(texto);
      if (!ficha){
        alert("o arquivo nao é um JSON valido");
        return;
      }

      if(!this.validarFicha(ficha)){
        alert("o arquivo nao é uma ficha valida");
        return;
      }

      this.setFicha(ficha);

    }
      input.click();
    };
    private validarFicha(ficha: any):boolean{

        if(!ficha.personagem){
          return false;
        }
        if(!ficha.habilidades){
          return false;
        }
        if(!ficha.inventario){
          return false;
        }
        if(!ficha.background){
          return false;
        }
        if(!ficha.notas){
          return false;
        }
        return true;
    }
    private lerFicha(texto: string){
      try{
        return JSON.parse(texto);
      }catch{
        return undefined;
      }
    }
  
}

