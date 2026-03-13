import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  dinheiro: number | null = null;

  itens = [
    { nome: '', quantidade: 0, descricao: '' },
    { nome: '', quantidade: 0, descricao: '' },
    { nome: '', quantidade: 0, descricao: '' },
  ];
}
