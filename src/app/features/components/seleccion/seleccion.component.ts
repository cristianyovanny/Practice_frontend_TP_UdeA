import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/models/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType} from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../core/Seleccion';
import { SeleccionService } from '../../services/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';

@Component({
  selector: 'app-seleccion',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent {

  public textoBusqueda: string = "";
  public selecciones: Seleccion[] = [];
  public columnas= [
    { name: 'Selección', prop: 'nombre' },
    { name: 'Entidad dirigente', prop: 'entidad'}
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  private seleccionEscogida: Seleccion | undefined;
  private indiceSeleccionEscogida: number = -1;

  constructor(private servicio: SeleccionService, private servicioDialogo: MatDialog) { 
    this.listar()
  }

  escoger(event: any) {
    if(event.type == "click"){
      this.seleccionEscogida = event.row;
      this.indiceSeleccionEscogida = this.selecciones.findIndex(seleccion => seleccion == this.seleccionEscogida);
    }
  }

  listar() {
    this.servicio.listar().subscribe({
      next: responde => {
        this.selecciones = responde;
      },
      error: error => {
        window.alert(error.mesaage);
      },
    });
  }

  buscar(){
    if (this.textoBusqueda.length > 0) {
      this.servicio.buscar(this.textoBusqueda).subscribe({
        next: responde => {
          this.selecciones = responde;
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      this.listar()
    }
  }

  agregar(){
    const dialogo = this.servicioDialogo.open(SeleccionEditarComponent, {
      width: '400px',
      height: '300px',
      data: {
        seleccion: {
          id: 0,
          nombre: "",
          entidad: ""
        },
        encabezado: "Agregando Selección de Fútbol"
      },
      disableClose: true
    });
    dialogo.afterClosed().subscribe({
      next: datos => {
        if(datos){
          this.servicio.agregar(datos.seleccion).subscribe({
            next: responde => {
              this.servicio.buscar(datos.seleccion.nombre).subscribe({
                next: responde => {
                  this.selecciones = responde;
                },
                error: error => {
                  window.alert(error.message);
                }
              });
            },
            error: error => {
              window.alert(error.message);
            }
          });
        }
      }
    });
  }

  modificar(){
    if(this.seleccionEscogida) {
      const dialogo = this.servicioDialogo.open(SeleccionEditarComponent, {
        width: '400px',
        height: '300px',
        data: {
          seleccion: this.seleccionEscogida,
          encabezado: `Editando Selección de Fútbol [${this.seleccionEscogida.nombre}]`
        },
        disableClose: true
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if(datos){
            this.servicio.modificar(datos.seleccion).subscribe({
              next: response => {
                this.selecciones [this.indiceSeleccionEscogida] = response;
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        }
      });
    }
    else {
      window.alert("Debe escoger una selección para modificarla");
    }
  }

  verificarEliminar(){

  }
}
