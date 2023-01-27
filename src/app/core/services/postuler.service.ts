import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ipostuler } from '../models/ipostuler';
@Injectable({
  providedIn: 'root'
})
export class PostulerService {

  apiURL: string=environment.url+"/postuler";

  constructor(private http:HttpClient) {
  }

  Postuler(uuid_offre:string){ 
    return new Promise((resolve, reject) => 
      {
        this.http.post<Ipostuler>(this.apiURL+"/create/"+uuid_offre,null)
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

  getCandidatPostulerByOffre(uuidOffre:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/get/offre/"+uuidOffre)
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

  count(){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/count")
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



  getPostulationsByCandidat(uuid:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/get/candidat/"+uuid)
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
