import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personagem',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personagem.component.html',
  styleUrls: ['./personagem.component.css']
})
export class PersonagemComponent {
  // Informações básicas
  nome = '';
  rankAgente = '';
  idade: number | null = null;
  sexo = '';

  // Treinamentos (lista de inputs)
  treinamentoCombatente = 0;
  treinamentoEspecialista = 0;
  treinamentoOcultista = 0;

  // Atributos
  forca = 0;
  destreza = 0;
  constituicao = 0;
  tamanho = 0;
  inteligencia = 0;
  sabedoria = 0;
  carisma = 0;
  poder = 0;

  // Status
  hpAtual = 0;
  hpMaximo = 0;
  energiaAtual = 0;
  energiaMaxima = 0;
  sanidadeAtual = 0;
  sanidadeMaxima = 0;

  // Perícias
  periciaGeral = '';
  periciaNome = '';
  periciaValor: number | null = null;

  // Bônus
  bonusCorpoACorpo: number | null = null;
  resistencias = '';
  outrosBonus = '';

  // Ataque
  ataqueNome = '';
  ataquePericia = '';
  ataqueDano = '';
  ataqueTipo = '';
  ataqueEfeito = '';
  ataqueMunicao = '';
}
