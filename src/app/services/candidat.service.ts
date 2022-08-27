import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidat } from '../interfaces/candidat';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  apiURL: string = 'http://localhost:3000/candidats'

  myCandidat:Candidat={
    IDCANDIDAT:'',
    NOM:'',
    PRENOM:'',
    DATENAISSANCE:'',
    VILLE:'',
    NATIONALITE:'',
    ADRESSE:'',
    TELEPHONE:'',
    EMAIL:''
  }

  constructor(private http:HttpClient) { }

  createNewCandidat(candidatP:Candidat){
    return new Promise((resolve, reject) => 
      {
        this.http.post<Candidat>(this.apiURL,candidatP)
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

  getCandidats(){
    return new Promise((resolve,reject) =>
      {
        this.http.get<Candidat[]>(this.apiURL)
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

  getCandidat(CANDIDAT:Candidat){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/"+CANDIDAT.IDCANDIDAT)
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
  getCandidatsByListOfID(list:string[]){
    let values:string=list.toString();
    return new Promise((resolve, reject) =>
      {
        this.http.get<Candidat[]>(this.apiURL+"/IDCANDIDAT/"+values+"&date/any")
        .subscribe
        (
          res=>{
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  }
  

  getCandidatWithEmail(email:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/EMAIL/"+email)
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


  updateCandidat(candidatP: Candidat){
    return new Promise((resolve, reject) => {
        this.http.put(this.apiURL+"/"+candidatP.IDCANDIDAT,candidatP).subscribe(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
            }
        )
    })
  }


  deleteCandidat(idcandidatP:string){
    return new Promise((resolve, reject) =>{
      this.http.delete(this.apiURL+"/"+idcandidatP)
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
