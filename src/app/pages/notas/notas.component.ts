import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FichaService } from '../../services/ficha.service';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit , OnDestroy {
  
  form!: FormGroup;
  sub!: Subscription;

  constructor(private fb:FormBuilder, private fichaService:FichaService){}

  ngOnInit(){
    
    this.form = this.fb.group({
      notas: this.fb.group({
        nota:[""],
      })
    });

    const ficha = this.fichaService.getFicha();
    this.form.get('notas')?.patchValue(ficha.notas);

    this.sub = this.form.valueChanges.pipe(debounceTime(300)).subscribe(valor => {
      this.fichaService.updateFicha(valor);
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
