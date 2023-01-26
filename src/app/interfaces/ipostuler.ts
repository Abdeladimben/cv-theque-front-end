import { Candidat } from "./candidat";
import { Offre } from "./offre";

export interface Ipostuler {
    uuid:string;
    offre:Offre,
    candidat:Candidat,
    DATEPOSTULER:Date
}
