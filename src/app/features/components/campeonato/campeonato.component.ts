import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/models/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Campeonato } from '../../../core/entidades/Campeonato';
import { CampeonatoService } from '../../services/campeonato.service';
import { MatDialog } from '@angular/material/dialog';
import { CampeonatoEditarComponent } from '../campeonato-editar/campeonato-editar.component';
import { DecidirComponent } from '../../../shared/components/decidir/decidir.component';

@Component({
  selector: 'app-campeonato',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './campeonato.component.html',
  styleUrl: './campeonato.component.css'
})
export class CampeonatoComponent {

  public textoBusqueda: string = "";
  public campeonatos: Campeonato[] = [];
  public columnas= [
    { name: 'Campeonato', prop: 'nombre' },
    { name: 'Año', prop: 'año'},
    { name: 'Organizador', prop: 'seleccion.nombre'}
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  private campeonatoEscogido: Campeonato | undefined;
  private indiceCampeonatoEscogido: number = -1;

  constructor(private servicio: CampeonatoService, private servicioDialogo: MatDialog) { 
    this.listar()
  }

  escoger(event: any) {
    if(event.type == "click"){
      this.campeonatoEscogido = event.row;
      this.indiceCampeonatoEscogido = this.campeonatos.findIndex(campeonato => campeonato == this.campeonatoEscogido);
    }
  }

  listar() {
    this.servicio.listar().subscribe({
      next: responde => {
        this.campeonatos = responde;
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
          this.campeonatos = responde;
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
    const dialogo = this.servicioDialogo.open(CampeonatoEditarComponent, {
      width: '400px',
      height: '300px',
      data: {
        campeonato: {
          id: 0,
          nombre: "",
          entidad: ""
        },
        encabezado: "Agregando Campeonato"
      },
      disableClose: true
    });
    dialogo.afterClosed().subscribe({
      next: datos => {
        if(datos){
          this.servicio.agregar(datos.campeonato).subscribe({
            next: responde => {
              this.servicio.buscar(datos.campeonato.nombre).subscribe({
                next: responde => {
                  this.campeonatos = responde;
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
    if(this.campeonatoEscogido) {
      const dialogo = this.servicioDialogo.open(CampeonatoEditarComponent, {
        width: '400px',
        height: '300px',
        data: {
          campeonato: this.campeonatoEscogido,
          encabezado: `Editando Campeonato [${this.campeonatoEscogido.nombre}]`
        },
        disableClose: true
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if(datos){
            this.servicio.modificar(datos.campeonato).subscribe({
              next: response => {
                this.campeonatos [this.indiceCampeonatoEscogido] = response;
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
      window.alert("Debe escoger una campeonato para modificarla");
    }
  }

  verificarEliminar(){
    if(this.campeonatoEscogido) {
      const dialogo = this.servicioDialogo.open(DecidirComponent, {
        width: '300px',
        height: '200px',
        data: {
          id: this.campeonatoEscogido.id,
          encabezado: `¿Está seguro de eliminar el campeonato [${this.campeonatoEscogido.nombre}]?`
        },
        disableClose: true
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if(datos){
            this.servicio.eliminar(datos.id).subscribe({
              next: response => {
                if(response){
                  this.listar();
                  window.alert("El campeonato de fútbol fue eliminada con éxito");
                }
                else {
                  window.alert("El campeonato de fútbol no pudo ser eliminada");
                }
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
      window.alert("Debe escoger una campeonato para modificarla");
    }
  }
}
