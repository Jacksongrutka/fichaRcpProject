import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FichaService } from '../../services/ficha.service';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit , OnDestroy {

  form!: FormGroup;
  sub!: Subscription;

  constructor(private fb:FormBuilder , private fichaService:FichaService){};

  ngOnInit(){
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

    const ficha = this.fichaService.getFicha();
    ficha.background.pessoasImportantes?.forEach(p => {
      this.pessoasImportantes.push(this.fb.group({
        nome:[p.nome],
        relacionamento:[p.relacionamento],
      }));
    });

    this.form.get('background')?.patchValue(ficha.background);

    this.sub = this.form.valueChanges.pipe(debounceTime(300)).subscribe(valor =>{
      this.fichaService.updateFicha(valor);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
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
  
}
