import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TesteService {

  constructor() {}

  resutadoTeste(dados: number[] , valorPericia: number, tipoVantagem: string):string{
    if(tipoVantagem == "vantagem"){
      const dadoUsado = Math.min(...dados);
      return this.calcularSucesso(valorPericia, dadoUsado);
    };
    if(tipoVantagem == "desvantagem"){
      const dadoUsado = Math.max(...dados);
      return this.calcularSucesso(valorPericia , dadoUsado);
    };
    return this.calcularSucesso(valorPericia, dados[0])
  };
  calcularSucesso(valorPericia: number ,valorDado: number):string{
    const margemSucessoBom = valorPericia / 2;
    const margemSucessoExtremo = valorPericia / 5;

    if(valorDado === 1){
      return "Sucesso Extraordinario"
    }
    if(valorDado <= margemSucessoExtremo){
      return "Sucesso Extremo"
    }
    if(valorDado > margemSucessoExtremo && valorDado <= margemSucessoBom){
      return "Sucesso Bom"
    }
    if(valorDado > margemSucessoBom && valorDado <= valorPericia){
      return "Sucesso Normal"
    }
    if(valorDado > valorPericia && valorDado <= 99){
      return "Falha"
    };
    return "Desastre"
    
   
  };
}