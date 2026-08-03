import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FichaService } from '../../services/fichaService/ficha.service';
import { Ficha } from '../../models/ficha';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit , OnDestroy {
  
  form!: FormGroup;
  formSub!: Subscription;
  updateSub!: Subscription;

  carregandoFormulario = false;

  constructor(private fb:FormBuilder, private fichaService:FichaService){}

  ngOnInit(){
  
      this.iniciarFormulario();
      this.atualizarFicha();
      
    };
    
    ngOnDestroy(): void {
      this.formSub?.unsubscribe();
      this.updateSub?.unsubscribe();
    }
  
    iniciarFormulario(){
      this.form = this.fb.group({
        notas: this.fb.group({
          nota:[""],
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
        this.atualizarFormulario(ficha);
        this.carregandoFormulario = false;
      });
    }
  
    atualizarFormulario(ficha: Ficha){
      this.form.patchValue(ficha, {
        emitEvent: false
      })
    }

}
