import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cv } from '../interfaces/cv';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  apiURL: string = 'http://localhost:3000/cv'

  myCv:Cv={
    IDCV:'',
    IDFORMATION:'',
    IDSPECIALITE:'',
    IDEXPERIENCE:'',
    IDCENTREINTERET:'',
    IDLANGUE:'',
    IDCANDIDAT:''
  }

  constructor(private http:HttpClient) { }

  createNewCv(cvP:Cv){
    return new Promise((resolve, reject) => 
      {
        this.http.post<Cv>(this.apiURL,cvP)
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

  getCvs(){
    return new Promise((resolve,reject) =>
      {
        this.http.get<Cv[]>(this.apiURL)
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

  getCv(IDCV:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/"+IDCV)
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


  getCvWithCandidat(IDCANDIDAT:string){
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


  deleteCv(cvP:Cv){
    return new Promise((resolve, reject) =>{
      this.http.delete(this.apiURL+"/"+cvP.IDCV)
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
