import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Offre } from '../models/offre';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  myOffre:Offre={
    uuid: '',
    type: '',
    poste: '',
    description_offre: '',
    competences: '',
    lieu: '',
    salaire: '',
    contrat: '',
    dureeContrat: '',
    dateOffre: new Date(),
    nombreCandidat:0
  }
  apiURL: string=environment.url+"/offre";

  constructor(private http:HttpClient) {
  }

  createNewOffre(OffreP:Offre){ 
    return new Promise((resolve, reject) => 
      {
        this.http.post<Offre>(this.apiURL+"/create",OffreP)
        .subscribe
        (
          res =>{
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  }

  getOffres(){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL)
        .subscribe(
          res=>{
            resolve(res);
          },
          err=>{
            reject(err);
          }
        )
      }
    )
  }

  getOffre(IDOffre:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/"+IDOffre)
        .subscribe(
          res=>{
            resolve(res);
          },
          err=>{
            reject(err);
          }
        )
      }
    )
  }

  updateOffre(OffreP: Offre){
    return new Promise((resolve, reject) => {
        this.http.put(this.apiURL+"/"+OffreP.uuid,OffreP).subscribe(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
            }
        )
    })
  }

  deleteOffre(uuid:any){
    return new Promise((resolve, reject) =>{
      this.http.delete(this.apiURL+"/delete/"+uuid)
      .subscribe(
        res =>{
          resolve(res);
        },err=>{
          reject(err)
        }
      )
    })
  }

}
