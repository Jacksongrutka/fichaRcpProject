import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent {
  idade: number | null = null;
  altura: number | null = null;
  corDosOlhos = '';
  membrosDecepados = '';
  aparenciaGeral = '';

  historia = '';

  pessoasImportantes = [
    { nome: '', relacao: '' },
    { nome: '', relacao: '' },
    { nome: '', relacao: '' },
  ];

  traumas = '';
  ancoras = '';
}
