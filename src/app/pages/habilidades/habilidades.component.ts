import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-habilidades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  form!: FormGroup;

  constructor (private fb:FormBuilder){}

  ngOnInit(){
    this.form = this.fb.group({
      combatente:[null],
      especialista:[null],
      ocultista:[null],
      poderes:this.fb.array([]),
      rituais:this.fb.array([]),
    });
    
  };

  get poderes (){
    return this.form.get('poderes') as FormArray;
  }
  get rituais(){
    return this.form.get('rituais') as FormArray;
  }
  adicionarPoder(){
    const novoPoder = this.fb.group({
      poderNome:[""],
      poderCusto:[null],
      poderDescricao:[""],
    });
    this.poderes.push(novoPoder);
  }
  adicionarRitual(){
    const novoRitual = this.fb.group({
      ritualNome:[""],
      RitualCusto:[null],
      RitualComponentes:[""],
      RitualDescricao:[""],
    })

    this.rituais.push(novoRitual);
  }
}
