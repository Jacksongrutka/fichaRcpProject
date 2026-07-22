import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { FichaService } from './services/ficha.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ficha-rcp-rpg';

  constructor(private fichaService: FichaService){}

  novaFicha(){
    if(!confirm("se clicar em sim o conteudo nao salvo sera perdido. deseja continuar?")){
        return;
      }
    this.fichaService.resetFicha();
  }
}
