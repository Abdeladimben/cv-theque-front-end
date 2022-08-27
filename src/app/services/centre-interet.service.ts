import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CentreInteret } from '../interfaces/centre-interet';

@Injectable({
  providedIn: 'root'
})
export class CentreInteretService {

  myCentreInteret:CentreInteret={
    IDCENTREINTERET:'',
    INTITULE:'',
    IDCANDIDAT:''
  }
  apiURL: string = 'http://localhost:3000/centreinterets'


  constructor(private http:HttpClient) { }

  createNewCentreInteret(CentreInteretP:CentreInteret){ 
    return new Promise((resolve, reject) => 
      {
        this.http.post<CentreInteret>(this.apiURL,CentreInteretP)
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
  getCentreInterets(){
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

  getCentreInteret(IDCENTREINTERET:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/"+IDCENTREINTERET)
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

  getCentreInteretWithCandidat(IDCANDIDAT:string){
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


  updateCentreInteret(CentreInteretP: CentreInteret){
    return new Promise((resolve, reject) => {
        this.http.put(this.apiURL+"/"+CentreInteretP.IDCENTREINTERET,CentreInteretP).subscribe(
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
