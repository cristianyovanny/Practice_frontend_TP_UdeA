import { Routes } from '@angular/router';
import { InicioComponent } from './features/components/inicio/inicio.component';
import { SeleccionComponent } from './features/components/seleccion/seleccion.component';
import { CampeonatoComponent } from './features/components/campeonato/campeonato.component';


export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'selecciones', component: SeleccionComponent },
    { path: 'campeonatos', component: CampeonatoComponent }
];
