import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  templateUrl: './deleteButton.component.html',
  styleUrls: ['./deleteButton.component.css']
})
export class DeleteButtonComponent {

  @Output()
  clicked = new EventEmitter<void>();

  clickButton() {
    this.clicked.emit();
  }

}