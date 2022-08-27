import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialite } from '../interfaces/specialite';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  apiURL: string = 'http://localhost:3000/specialites'

  mySpecialite:Specialite={
    IDSPECIALITE:'',
    INTITULE:'',
    IDCANDIDAT:''
  }
  

  constructor(private http:HttpClient) { }


  createNewSpecialite(SpecialiteP:Specialite){
    return new Promise((resolve, reject) => 
      {
        this.http.post<Specialite>(this.apiURL,SpecialiteP)
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

  getSpecialites(){
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

  getSpecialite(IDSPECIALITE:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/"+IDSPECIALITE)
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

  getSpecialiteWithCandidat(IDCANDIDAT:string){
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


  updateSpecialite(SpecialiteP: Specialite){
    return new Promise((resolve, reject) => {
        this.http.put(this.apiURL+"/"+SpecialiteP.IDSPECIALITE,SpecialiteP).subscribe(
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
