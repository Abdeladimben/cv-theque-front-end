import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offre } from 'src/app/interfaces/offre';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  myOffre:Offre={
    IDOFFRE: 0,
    TYPE: '',
    POSTE: '',
    DESCRIPTION: '',
    COMPETENCES: '',
    LIEU: '',
    SALAIRE: '',
    CONTRAT: '',
    DUREECONTRAT: '',
    DATEOFFRE: new Date(),
    NBRCANDIDAT:0
  }

  apiURL: string = 'http://localhost:3000/offre'

  constructor(private http:HttpClient) { }

  createNewOffre(OffreP:Offre){ 
    return new Promise((resolve, reject) => 
      {
        this.http.post<Offre>(this.apiURL,OffreP)
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
        this.http.put(this.apiURL+"/"+OffreP.IDOFFRE,OffreP).subscribe(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
            }
        )
    })
  }

  deleteOffre(id:any){
    return new Promise((resolve, reject) =>{
      this.http.delete(this.apiURL+"/"+id)
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
