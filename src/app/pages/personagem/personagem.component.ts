import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FichaService } from '../../services/ficha.service';

@Component({
  selector: 'app-personagem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personagem.component.html',
  styleUrls: ['./personagem.component.css']
})
export class PersonagemComponent implements OnInit , OnDestroy {
  
  form!: FormGroup; 
  sub!: Subscription;

  constructor(private fb:FormBuilder , private fichaService:FichaService){}

  ngOnInit(){
    this.form = this.fb.group({
      nome:[""],
      rankAgente:[""],
      sexo:[""],
      idade:[null],
      combatente:[null],
      especialista:[null],
      ocultista:[null],
      forca:[null],
      destreza:[null],
      constituicao:[null],
      tamanho:[null],
      sabedoria:[null],
      inteligencia:[null],
      carisma:[null],
      poder:[null],
      hpAtual:[null],
      hpMax:[null],
      energiaAtual:[null],
      energiaMax:[null],
      sanidadeAtual:[null],
      sanidadeMax:[null],
      pericias:this.fb.array([]),
      bonusCorpoACorpo:[null],
      resistencias:this.fb.array([]),
      outrosBonus:this.fb.array([]),
      ataques:this.fb.array([]),
    });

    const ficha = this.fichaService.getFicha();
    
    console.log(ficha)

    
    ficha.personagem.pericias.forEach(p => {
      this.pericias.push(this.fb.group({
        periciaNome:[p.periciaNome],
        periciaValor:[p.periciaValor],
      }))
    });
    /* personagem.bonus.resistencias?.forEach(p => {
      this.resistencias.push(this.fb.group({
        resistenciaNome:[p.tipo],
        resistenciaValor:[p.valor],
      }))
    }) */
    this.form.patchValue(ficha);

    this.sub = this.form.valueChanges.pipe(debounceTime(300)).subscribe(valor => {
      this.fichaService.updateFicha(valor);
    });

    }

    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }

  get pericias(){
    return this.form.get('pericias') as FormArray;
  }
  get resistencias(){
    return this.form.get('resistencias') as FormArray;
  }
  get outrosBonus(){
    return this.form.get('outrosBonus') as FormArray;
  }
  get ataques(){
    return this.form.get('ataques') as FormArray;
  }
  adicionarPericia(){
    const novaPericia = this.fb.group({
      periciaNome:[""],
      periciaValor:[null],
    });

    this.pericias.push(novaPericia);
  }
  adicionarResistencia(){
    const novaResistencia = this.fb.group({
      resistenciaNome:[""],
      resistenciaValor:[null],
    });

    this.resistencias.push(novaResistencia)
  }
  adicionarOutrosBonus(){
    const novoBonus = this.fb.group({
      outroBonusNome:[""],
      outroBonusValor:[null],
    });
    this.outrosBonus.push(novoBonus)
  }
  adicionarAtaques(){
    const novoAtaque = this.fb.group({
      ataqueNome:[""],
      ataquePericiaUsada:[""],
      ataqueDano:[""],
      tipoDano:[""],
      ataqueEfeito:[""],
      ataqueMunicao:[""],
    });
    this.ataques.push(novoAtaque)
  }
  teste(){
    console.log(this.form.value);
  }

}
