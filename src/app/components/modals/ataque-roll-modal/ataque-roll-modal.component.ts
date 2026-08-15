import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DadosService } from '../../../services/diceService/dados.service';
import { TesteService } from '../../../services/testeService/teste.service';

@Component({
  selector: 'app-ataque-roll-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ataque-roll-modal.component.html',
  styleUrls: ['./ataque-roll-modal.component.css']
})
export class AtaqueRollModalComponent implements OnInit {

  @Input() valorPericiaUsada!: number;
  @Input() danoAtaqueInput!: string;
  @Output() clicked = new EventEmitter<void>();
  ataqueRollForm!: FormGroup;
  resultadoTeste = ""
  dadosFinalTesteRolados: number[] = []
  dadosFinalDanoRolado: number[] = []
  resultadoSomado: number = 0
  danoCritico: number = 0
  resultadoDeveAparecer: boolean = false
  classeResultado: string = ""

    constructor(private fb:FormBuilder , private dadosService: DadosService, private testeService: TesteService){}

    ngOnInit(){
        this.iniciarFormulario()
        this.preencherDanoAtaque()
    }

    iniciarFormulario(){
        this.ataqueRollForm = this.fb.group({
            qtdDados: [1],
            tipoVantagem:["normal"],
            danoAtaque:[""],
        })
    }

    selecionarTipoVantagem(tipo: string){
        this.ataqueRollForm.get('tipoVantagem')?.setValue(tipo)
    }

    rolarDados(){
        let qtdDados: number = this.ataqueRollForm.value.qtdDados
        if(this.ataqueRollForm.value.tipoVantagem != "normal" && qtdDados < 2){
            qtdDados++
        }
        const dadosTesteRolados = this.dadosService.rolarDados(qtdDados, 100)
        const resultadoTesteRetorno = this.testeService.resutadoTeste(dadosTesteRolados, this.valorPericiaUsada, this.ataqueRollForm.value.tipoVantagem)
        this.resultadoTeste = resultadoTesteRetorno
        this.classeResultado = resultadoTesteRetorno.toLowerCase().replaceAll(' ' , '-')
        const expressoesSeparadas = this.dadosService.interpretarExpressaoDano(this.ataqueRollForm.value.danoAtaque)
        let dadosDanoRolado: number[] = []
        let bonus: number[] = []
        expressoesSeparadas?.forEach((expressao) =>{
            const resultado = expressao.match(/([+-]?\d+)d(\d+)/i)
            if(resultado){
                const retornoRolarDados = this.dadosService.rolarDados(Math.abs(Number(resultado[1])), Number(resultado[2]))
                if(Number(resultado[1]) < 0){
                    dadosDanoRolado.push(...retornoRolarDados.map(value => -value))
                } else{
                    dadosDanoRolado.push(...retornoRolarDados)
                    const danoMaximoDado = Number(resultado[1])*Number(resultado[2])
                    this.danoCritico = this.danoCritico + danoMaximoDado
                }
                this.dadosFinalDanoRolado.push(...retornoRolarDados)
            } else {
                bonus.push(Number(expressao))
            }
        })
        this.resultadoSomado = dadosDanoRolado.reduce((soma, valor) => soma + valor);
        this.dadosFinalTesteRolados = dadosTesteRolados;
        this.resultadoDeveAparecer = true

    }
    preencherDanoAtaque(){
        this.ataqueRollForm.get('danoAtaque')?.setValue(this.danoAtaqueInput)
    }
    cancelarButtonClicked(){
        this.clicked.emit()
    }
}
