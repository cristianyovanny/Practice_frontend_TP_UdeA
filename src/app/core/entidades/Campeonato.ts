import { Seleccion } from "./Seleccion";

export interface Campeonato {
    id: number,
    nombre: string,
    año: number,
    seleccion: Seleccion
}