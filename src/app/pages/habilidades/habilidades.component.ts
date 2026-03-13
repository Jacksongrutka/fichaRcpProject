import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habilidades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent {
  // Evoluções
  combatente: number | null = null;
  especialista: number | null = null;
  ocultista: number | null = null;

  // Poderes
  poderNome = '';
  poderCusto: number | null = null;
  poderDescricao = '';

  // Rituais
  ritualNome = '';
  ritualCusto: number | null = null;
  ritualComponentes = '';
  ritualDescricao = '';
}
