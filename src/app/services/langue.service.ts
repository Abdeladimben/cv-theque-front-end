import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Langue } from '../interfaces/langue';

@Injectable({
  providedIn: 'root'
})
export class LangueService {

  apiURL: string = 'http://localhost:3000/langues'

  myLangue:Langue={
    IDLANGUE:'',
    NOM:'',
    NIVEAU:'',
    IDCANDIDAT:''
  }

  constructor(private http:HttpClient) { }

  createNewLangue(LangueP:Langue){
    return new Promise((resolve, reject) => 
      {
        this.http.post<Langue>(this.apiURL,LangueP)
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

  getLangues(){
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

  getLangue(IDLANGUE:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/"+IDLANGUE)
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

  getLangueWithCandidat(IDCANDIDAT:string){
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


  updateLangue(LangueP: Langue){
    return new Promise((resolve, reject) => {
        this.http.put(this.apiURL+"/"+LangueP.IDLANGUE,LangueP).subscribe(
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
