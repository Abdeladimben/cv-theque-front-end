import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ipostuler } from 'src/app/interfaces/ipostuler';
@Injectable({
  providedIn: 'root'
})
export class PostulerService {

  apiURL: string = 'http://localhost:3000/postuler'

  constructor(private http:HttpClient) { }
  
  Postuler(PostulerP:Ipostuler){ 
    return new Promise((resolve, reject) => 
      {
        this.http.post<Ipostuler>(this.apiURL,PostulerP)
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

  getNumbreOfPostulations(){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/count/0")
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

  getPostulationsByCandidat(IDCANDIDAT:string){
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

  getCandidatPostulerByOffre(IDOffre:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/IDOFFRE/"+IDOffre)
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



}
