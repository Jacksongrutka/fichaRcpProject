import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { DadosService } from '../../../services/diceService/dados.service';
import { TesteService } from '../../../services/testeService/teste.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-dice-roll',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-dice-roll.component.html',
  styleUrl: './modal-dice-roll.component.css'
})
export class ModalDiceRollComponent implements OnInit {

  @Output() clicked = new EventEmitter<void>();
  @Input() valorPericiaUsada!: number;
  diceRollForm!: FormGroup;

  resultadoDeveAparecer = false;
  dadosRolados = [0]
  resultadoTeste = ""
  classeResultado = ""

  constructor(private fb:FormBuilder, private dadosService: DadosService, private testeService: TesteService ) {}

  ngOnInit(){
    this.iniciarFormulario();
  }

  iniciarFormulario(){
    this.diceRollForm = this.fb.group({
      qtdDados: [1],
      tipoVantagem: ["normal"],
    })
  }

  selecionarTipoVantagem(tipo: string){
    this.diceRollForm.get('tipoVantagem')?.setValue(tipo);
  }
  rolarDados(){
    let qtdDados: number = this.diceRollForm.value.qtdDados;
    if (this.diceRollForm.value.tipoVantagem != "normal" && qtdDados < 2){
      qtdDados++;
    }
    const dadoRolado = this.dadosService.rolarDados(qtdDados ,100);
    const resultado = this.testeService.resutadoTeste(dadoRolado , this.valorPericiaUsada, this.diceRollForm.value.tipoVantagem);
    this.dadosRolados = dadoRolado;
    this.resultadoTeste = resultado;
    this.classeResultado = resultado.toLowerCase().replaceAll(' ' , '-')
    this.resultadoDeveAparecer = true;
  }
  cancelarButtonClicked(){
    this.clicked.emit();
  }
}
