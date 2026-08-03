import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { FichaService } from './services/fichaService/ficha.service';
import { DadosService } from './services/diceService/dados.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ficha-rcp-rpg';

  constructor(private fichaService: FichaService , private dadosService: DadosService){}

  novaFicha(){
    if(!confirm("se clicar em sim o conteudo nao salvo sera perdido. deseja continuar?")){
        return;
      }
    this.fichaService.resetFicha();
  }
  baixarFicha(){
    this.fichaService.downloadFicha();
  }
  importarFicha(){
    this.fichaService.uploadFicha();
  }
  rolarDados(){
    console.log(this.dadosService.rolarDados(4, 20));
  }
}
