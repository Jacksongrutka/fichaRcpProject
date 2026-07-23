import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FichaService } from '../../services/ficha.service';
import { Ficha } from '../../models/ficha';
import { DeleteButtonComponent } from '../../components/deleteButton/deleteButton.component';
@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DeleteButtonComponent],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit , OnDestroy {

  form!: FormGroup;
  formSub!: Subscription;
  updateSub!: Subscription;

  carregandoFormulario = false;

  constructor(private fb:FormBuilder , private fichaService:FichaService){};

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
      background: this.fb.group({
        aparencia: this.fb.group({
          idade:[null],
          altura:[null],
          corDosOlhos:[""],
          membrosDecepados:[""],
          aparenciaGeral:[""],
        }),
        historia:[""],
        pessoasImportantes:this.fb.array([]),
        traumas:[""],
        ancoras:[""],
      })
    })
  
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
        this.carregarArrays(ficha);
        this.atualizarFormulario(ficha);
        this.carregandoFormulario = false;
      });
    }
  
    carregarArrays(ficha: Ficha){
    
        this.pessoasImportantes.clear({emitEvent:false});
  
        ficha.background.pessoasImportantes?.forEach(p => {
          this.pessoasImportantes.push(this.fb.group({
            nome:[p.nome],
            relacionamento:[p.relacionamento],
          }),{emitEvent:false})
        })
    }
    atualizarFormulario(ficha: Ficha){
      this.form.patchValue(ficha, {
        emitEvent: false
      })
    }

  get pessoasImportantes(){
    return this.form.get(['background','pessoasImportantes']) as FormArray;
  }

  adicionarPessoa(){
    const novaPessoa = this.fb.group({
      nome:[""],
      relacionamento:[""],
    });

    this.pessoasImportantes.push(novaPessoa);
  }
  removerItem(array: FormArray , index: number){
    array.removeAt(index);
  }
  
}
