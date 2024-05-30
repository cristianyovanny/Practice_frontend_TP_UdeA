import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../models/referencias-material.module';
import { Seleccion } from '../../../core/entidades/Seleccion';

export interface DatosDecision {
  encabezado: string;
  id: number;
}

@Component({
  selector: 'app-decidir',
  standalone: true,
  imports: [
    ReferenciasMaterialModule
  ],
  templateUrl: './decidir.component.html',
  styleUrl: './decidir.component.css'
})
export class DecidirComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosDecision, public dialogRef: MatDialogRef<DecidirComponent>) {
    
  }

  cerrar(){
    this.dialogRef.close();
  }
}
