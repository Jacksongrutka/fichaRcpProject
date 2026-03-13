import { Routes } from '@angular/router';

import { BackgroundComponent } from './pages/background/background.component';
import { HabilidadesComponent } from './pages/habilidades/habilidades.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { NotasComponent } from './pages/notas/notas.component';
import { PersonagemComponent } from './pages/personagem/personagem.component';

export const routes: Routes = [
  { path: '', component: PersonagemComponent },
  { path: 'personagem', component: PersonagemComponent },
  { path: 'habilidades', component: HabilidadesComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'background', component: BackgroundComponent },
  { path: 'notas', component: NotasComponent },
];

