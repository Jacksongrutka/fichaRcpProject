import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FichaService } from '../../services/ficha.service';
import { Ficha } from '../../models/ficha';
import { DeleteButtonComponent } from '../../components/deleteButton/deleteButton.component';

@Component({
  selector: 'app-personagem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DeleteButtonComponent],
  templateUrl: './personagem.component.html',
  styleUrls: ['./personagem.component.css']
})
export class PersonagemComponent implements OnInit , OnDestroy {
  
  form!: FormGroup; 
  formSub!: Subscription;
  updateSub!: Subscription;

  private carregandoFormulario = false;

  constructor(private fb:FormBuilder , private fichaService:FichaService){}

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
      personagem: this.fb.group({
        informacaoPersonagem: this.fb.group({
          nome:[""],
          rankAgente:[""],
          idade:[null],
          sexo:[""],
          treinamentoCombatente:[null],
          treinamentoEspecialista:[null],
          treinamentoOcultista:[null],
        }),
        atributos: this.fb.group({
          forca:[null],
          destreza:[null],
          constituicao:[null],
          tamanho:[null],
          inteligencia:[null],
          sabedoria:[null],
          carisma:[null],
          poder:[null],
        }),
        status: this.fb.group({
          vidaAtual:[null],
          vidaMax:[null],
          energiaAtual:[null],
          energiaMax:[null],
          sanidadeAtual:[null],
          sanidadeMax:[null],
          ferimentos: this.fb.array([]),
        }),
        pericias: this.fb.array([]),
        bonus: this.fb.group({
          bonusCorpoACorpo:[null],
          resistencias:this.fb.array([]),
          OutrosBonus:this.fb.array([]),
        }),
        ataques: this.fb.array([]),
      })
    });

    this.formSub = this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(valor => {
        console.log("personagem enviou")
        if (this.carregandoFormulario) {
          return;
        }
        this.fichaService.updateFicha(valor);
      });
  }
  atualizarFicha() {
  this.updateSub = this.fichaService.ficha$.subscribe(ficha => {
    this.carregandoFormulario = true;
    this.carregarArrays(ficha);
    this.atualizarFormulario(ficha);
    this.carregandoFormulario = false;
  });
}
  carregarArrays(ficha: Ficha){

    this.pericias.clear({
      emitEvent:false
    });
    this.resistencias.clear({
      emitEvent: false
    });
    this.outrosBonus.clear({
      emitEvent: false
    });
    this.ataques.clear({
      emitEvent: false
    });

    ficha.personagem.pericias.forEach(p => {
      this.pericias.push(this.fb.group({
          periciaNome:[p.periciaNome],
          periciaValor:[p.periciaValor],
        }),{
          emitEvent:false
        });
      });

    ficha.personagem.bonus.resistencias?.forEach(r => {
      this.resistencias.push(this.fb.group({
        resistenciaNome:[r.tipo],
        resistenciaValor:[r.valor],
      }),{
        emitEvent: false
      });
    });

    ficha.personagem.bonus.OutrosBonus?.forEach(b => {
      this.outrosBonus.push(this.fb.group({
        outroBonusNome:[b.nome],
        outroBonusValor:[b.valor],
      }), {
        emitEvent:false
      });
    });

    ficha.personagem.ataques?.forEach(i => {
      this.ataques.push(this.fb.group({
        ataqueNome:[i.ataqueNome],
        ataquePericiaUsada:[i.ataquePericiaUsada],
        ataqueDano:[i.ataqueDano],
        tipoDano:[i.tipoDano],
        ataqueEfeito:[i.ataqueEfeito],
        ataqueMunicao:[i.ataqueMunicao],

      }), {
        emitEvent:false
      });
    });
  }
  atualizarFormulario(ficha: Ficha){
    this.form.patchValue(ficha, {
      emitEvent: false
    })
  }
  get pericias(){
    return this.form.get(['personagem', 'pericias']) as FormArray;
  }
  get resistencias(){
    return this.form.get(['personagem', 'bonus', 'resistencias']) as FormArray;
  }
  get outrosBonus(){
    return this.form.get(['personagem', 'bonus', 'OutrosBonus']) as FormArray;
  }
  get ataques(){
    return this.form.get(['personagem', 'ataques']) as FormArray;
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
  removerItem(array: FormArray , index: number):void{
    array.removeAt(index);
  }
}
