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
      habilidades: this.fb.group({
        combatente:[null],
        especialista:[null],
        ocultista:[null],
        poderes:this.fb.array([]),
        ritual:this.fb.array([]),
      })
    });
    
    const ficha = this.fichaService.getFicha();
    ficha.habilidades.poderes?.forEach(p => {
      this.poderes.push(this.fb.group({
        nome:[p.nome],
        custo:[p.custo],
        descricao:[p.descricao],
      }));
    });
    ficha.habilidades.ritual?.forEach(r => {
      this.rituais.push(this.fb.group({
        nome:[r.nome],
        custo:[r.custo],
        componentes:[r.componentes],
        descricao:[r.descricao],
      }));
    });

    this.form.get('habilidades')?.patchValue(ficha.habilidades);

    this.sub = this.form.valueChanges.pipe(debounceTime(300)).subscribe( valor => {
      this.fichaService.updateFicha(valor);
    })
  };
  
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get poderes (){
    return this.form.get(['habilidades','poderes']) as FormArray;
  }
  get rituais(){
    return this.form.get(['habilidades','ritual']) as FormArray;
  }
  adicionarPoder(){
    const novoPoder = this.fb.group({
      nome:[""],
      custo:[null],
      descricao:[""],
    });
    this.poderes.push(novoPoder);
  }
  adicionarRitual(){
    const novoRitual = this.fb.group({
      nome:[""],
      custo:[null],
      componentes:[""],
      descricao:[""],
    })

    this.rituais.push(novoRitual);
  }
}
