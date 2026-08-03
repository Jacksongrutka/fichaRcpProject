import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  
  constructor() {}

  public rolarDados(qtdRolagens: number , numeroDeFaces: number): Array<number>{
    const valores = this.gerarNumeroAleatorio(qtdRolagens);

    console.log(valores);

    return Array.from(valores, valor => (valor%numeroDeFaces) +1)
  }

  private gerarNumeroAleatorio(qtdRolagens: number): Uint32Array{
    const array = new Uint32Array(qtdRolagens);
    crypto.getRandomValues(array);
    return array;
  }

}
