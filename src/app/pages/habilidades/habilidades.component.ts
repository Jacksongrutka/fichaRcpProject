import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FichaService } from '../../services/ficha.service';

@Component({
  selector: 'app-habilidades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit , OnDestroy {

  form!: FormGroup;
  sub!: Subscription;

  constructor (private fb:FormBuilder, private fichaService:FichaService){}

  ngOnInit(){
    this.form = this.fb.group({
      combatente:[null],
      especialista:[null],
      ocultista:[null],
      poderes:this.fb.array([]),
      rituais:this.fb.array([]),
    });
    
    const ficha = this.fichaService.getFicha();
    this.form.patchValue(ficha);

    this.sub = this.form.valueChanges.pipe(debounceTime(300)).subscribe( valor => {
      this.fichaService.updateFicha(valor);
    })
  };
  
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

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
