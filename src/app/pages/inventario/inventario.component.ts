import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FichaService } from '../../services/ficha.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit , OnDestroy {
  
  form!: FormGroup;
  sub!: Subscription;

  constructor(private fb:FormBuilder , private fichaService:FichaService){};

  ngOnInit(){
    
    this.form = this.fb.group({
      inventario: this.fb.group({
        dinheiro:[null],
        item:this.fb.array([]),
      })
    });

    const ficha = this.fichaService.getFicha();
    ficha.inventario.item?.forEach(item => {
      this.itens.push(this.fb.group({
        nome:[item.nome],
        quantidade:[item.quantidade],
        descricao:[item.descricao],
      }));
    });

    this.form.get('inventario')?.patchValue(ficha.inventario);

    this.sub = this.form.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.fichaService.updateFicha(value);
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get itens(){
      return this.form.get(['inventario','item']) as FormArray
    }

  adicionarItem(){
    const novoItem = this.fb.group({
      mome:[""],
      quantidade:[null],
      descricao:[""],
     });
     
    this.itens.push(novoItem);
  }

}
