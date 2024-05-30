import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { Campeonato } from '../../core/entidades/Campeonato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  public url: string;

  constructor(private http: HttpClient) { 
    this.url = `${environment.urlBase}campeonatos/`;
  }

  public listar():Observable<Campeonato[]>{ 
    return this.http.get<Campeonato[]>(`${this.url}listar`);
  }

  public buscar(nombre: string):Observable<Campeonato[]>{ 
    return this.http.get<Campeonato[]>(`${this.url}buscar/${nombre}`);
  }

  public agregar(campeonato: Campeonato):Observable<Campeonato>{ 
    return this.http.post<Campeonato>(`${this.url}agregar`, campeonato);
  }

  public modificar(campeonato: Campeonato):Observable<Campeonato>{ 
    return this.http.put<Campeonato>(`${this.url}modificar`, campeonato);
  }

  public eliminar(id: number):Observable<boolean>{ 
    return this.http.delete<boolean>(`${this.url}eliminar/${id}`);
  }
}
