import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formation } from '../interfaces/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  apiURL: string = 'http://localhost:3000/formations'

  myFormation:Formation={
    IDFORMATION:'',
    DIPLOME:'',
    INSTITUT:'',
    ANNEESCOLAIRE:'',
    MENTION:'',
    IDCANDIDAT:'',
  }

  constructor(private http:HttpClient) { }

  createNewFormation(FormationP:Formation){
    return new Promise((resolve, reject) => 
      {
        this.http.post<Formation>(this.apiURL,FormationP)
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

  getFormations(){
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

  getFormation(IDFORMATION:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/"+IDFORMATION)
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

  getFormationWithCandidat(IDCANDIDAT:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/IDCANDIDAT/"+IDCANDIDAT)
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


  updateFormation(FormationP: Formation){
    return new Promise((resolve, reject) => {
        this.http.put(this.apiURL+"/"+FormationP.IDFORMATION,FormationP).subscribe(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
            }
        )
    })
  }
}
