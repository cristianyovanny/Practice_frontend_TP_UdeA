import { Routes } from '@angular/router';
import { InicioComponent } from './features/components/inicio/inicio.component';
import { SeleccionComponent } from './features/components/seleccion/seleccion.component';


export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'seleccion', component: SeleccionComponent },
];
