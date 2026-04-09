import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  
  form!: FormGroup;

  constructor(private fb:FormBuilder){};

  ngOnInit(){
    
    this.form = this.fb.group({
      dinheiro:[null],
      itens:this.fb.array([]),
    });
  }

  get itens(){
      return this.form.get('itens') as FormArray
    }

  adicionarItem(){
    const novoItem = this.fb.group({
      itemNome:[""],
      itemQuantidade:[null],
       itemDescricao:[""],
     });
     
    this.itens.push(novoItem);
  }

}
