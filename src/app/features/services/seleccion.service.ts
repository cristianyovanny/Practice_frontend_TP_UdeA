import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Seleccion } from '../../core/entidades/Seleccion';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  public url: string;

  constructor(private http: HttpClient) { 
    this.url = `${environment.urlBase}selecciones/`;
  }

  public listar():Observable<Seleccion[]>{ 
    return this.http.get<Seleccion[]>(`${this.url}listar`);
  }

  public buscar(nombre: string):Observable<Seleccion[]>{ 
    return this.http.get<Seleccion[]>(`${this.url}buscar/${nombre}`);
  }

  public agregar(seleccion: Seleccion):Observable<Seleccion>{ 
    return this.http.post<Seleccion>(`${this.url}agregar`, seleccion);
  }

  public modificar(seleccion: Seleccion):Observable<Seleccion>{ 
    return this.http.put<Seleccion>(`${this.url}modificar`, seleccion);
  }

  public eliminar(id: number):Observable<boolean>{ 
    return this.http.delete<boolean>(`${this.url}eliminar/${id}`);
  }

}
