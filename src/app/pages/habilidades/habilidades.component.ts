import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FichaService } from '../../services/fichaService/ficha.service';
import { Ficha } from '../../models/ficha';
import { DeleteButtonComponent } from '../../components/deleteButton/deleteButton.component';

@Component({
  selector: 'app-habilidades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DeleteButtonComponent],
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit , OnDestroy {

  form!: FormGroup;
  formSub!: Subscription;
  updateSub!: Subscription;

  private carregandoFormulario = false;

  constructor (private fb:FormBuilder, private fichaService:FichaService){}

  ngOnInit(){

    this.iniciarFormulario();
    this.atualizarFicha();
    
  };
  
  ngOnDestroy(): void {
    this.formSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }

  iniciarFormulario(){
    this.form = this.fb.group({
      habilidades: this.fb.group({
        evolucao: this.fb.group({
          combatente: [null],
          especialista: [null],
          ocultista: [null],
        }),
        poderes:this.fb.array([]),
        rituais:this.fb.array([]),
      })
    });

    this.formSub = this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(valor => {
        if (this.carregandoFormulario) {
          return;
        }
        this.fichaService.updateFicha(valor);
      });
  }

  atualizarFicha(){
    this.updateSub = this.fichaService.ficha$.subscribe(ficha => {
      this.carregandoFormulario = true;
      if(this.arrayMudouTamanho(ficha)){
        this.carregarArrays(ficha);
      }
      this.atualizarFormulario(ficha);
      this.carregandoFormulario = false;
    });
  }

  carregarArrays(ficha: Ficha){
  
      this.poderes.clear({emitEvent:false});
      this.rituais.clear({emitEvent:false});

      ficha.habilidades.poderes?.forEach(p => {
        this.poderes.push(this.fb.group({
          nome:[p.nome],
          custo:[p.custo],
          descricao:[p.descricao],
        }),{emitEvent:false})
      })
      ficha.habilidades.rituais?.forEach(r => {
        this.rituais.push(this.fb.group({
          nome:[r.nome],
          custo:[r.custo],
          componentes:[r.componentes],
          descricao:[r.descricao],
        }),{emitEvent:false})
      })
  }
  atualizarFormulario(ficha: Ficha){
    this.form.patchValue(ficha, {
      emitEvent: false
    })
  }
  private arrayMudouTamanho(ficha: Ficha): boolean {

    if (this.poderes.length !== ficha.habilidades.poderes.length) {
      return true;
    }

    if (this.rituais.length !== ficha.habilidades.rituais.length) {
      return true;
    }

    return false;
  }
  get poderes (){
    return this.form.get(['habilidades','poderes']) as FormArray;
  }
  get rituais(){
    return this.form.get(['habilidades','rituais']) as FormArray;
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
  removerItem(array: FormArray, index: number):void{
    array.removeAt(index);
  }
}
