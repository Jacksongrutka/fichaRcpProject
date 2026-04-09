import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb:FormBuilder){};

  ngOnInit(){
    this.form = this.fb.group({
      idade:[null],
      altura:[null],
      corDosOlhos:[""],
      membrosDecepados:[""],
      aparenciaGeral:[""],
      historia:[""],
      pessoasImportantes:this.fb.array([]),
      traumas:[""],
      ancoras:[""],
    })
  }

  get pessoasImportantes(){
    return this.form.get('pessoasImportantes') as FormArray;
  }

  adicionarPessoa(){
    const novaPessoa = this.fb.group({
      nomePessoa:[""],
      relacaoPessoa:[""],
    });

    this.pessoasImportantes.push(novaPessoa);
  }
  
}
