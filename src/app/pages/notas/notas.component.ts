import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  
  form!: FormGroup;

  constructor(private fb:FormBuilder){}

  ngOnInit(){
    
    this.form = this.fb.group({
      nota:[""],
    });
  }

}
