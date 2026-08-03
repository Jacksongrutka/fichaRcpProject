import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-roll-button',
  standalone: true,
  templateUrl: './rollButton.component.html',
  styleUrl: './rollButton.component.css'
})
export class RollButtonComponent {

  @Output()
  clicked = new EventEmitter<void>();

  clickButton() {
    this.clicked.emit();
  }
}
