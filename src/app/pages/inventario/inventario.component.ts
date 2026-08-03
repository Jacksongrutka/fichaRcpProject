import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FichaService } from '../../services/fichaService/ficha.service';
import { Ficha } from '../../models/ficha';
import { DeleteButtonComponent } from '../../components/deleteButton/deleteButton.component';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DeleteButtonComponent],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit , OnDestroy {
  
  form!: FormGroup;
  formSub!: Subscription;
  updateSub!: Subscription;

  carregandoFormulario = false;
  constructor(private fb:FormBuilder , private fichaService:FichaService){};

  ngOnInit(){
    
    this.iniciarFormulario();
    this.atualizarFicha();

  }

  ngOnDestroy(): void {
    this.formSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }

  iniciarFormulario(){
    this.form = this.fb.group({
      inventario: this.fb.group({
        dinheiro:[null],
        item:this.fb.array([]),
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

      this.itens.clear({emitEvent:false})

      ficha.inventario.item.forEach(i => {
        this.itens.push(this.fb.group({
          nome:[i.nome],
          quantidade:[i.quantidade],
          descricao:[i.descricao],
        }),{emitEvent:false})
      });
  }
  atualizarFormulario(ficha: Ficha){
    this.form.patchValue(ficha, {
      emitEvent: false
    })
  }
  private arrayMudouTamanho(ficha: Ficha): boolean {

    if (this.itens.length !== ficha.inventario.item.length) {
      return true;
    }

    return false;
  }
  get itens(){
      return this.form.get(['inventario','item']) as FormArray
    }

  adicionarItem(){
    const novoItem = this.fb.group({
      nome:[""],
      quantidade:[null],
      descricao:[""],
     });
     
    this.itens.push(novoItem);
  }
  removerItem(array: FormArray , index: number){
    array.removeAt(index);
  }

}
