import { CentreInteret } from "./centre-interet";
import { Experience } from "./experience";
import { Formation } from "./formation";
import { Langue } from "./langue";
import { Specialite } from "./specialite";

export interface Candidat {
    uuid: string;
    nom:string;
    prenom:string;
    intitule:string;
    dateNaissance:string;
    lieuNaissance:string;
    nationalite:string;
    adresse:string;
    email?:any;
    telephone:string;
    propos:string;
    checkCV?:boolean;
    checkLettre?:boolean;
    centreInterets:CentreInteret[];
    experiences:Experience[];
    formations:Formation[];
    langues:Langue[];
    specialites:Specialite[];
}
