import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experience } from '../interfaces/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  apiURL: string = 'http://localhost:3000/experiences'

  myExperience:Experience={
    IDEXPERIENCE:'',
    TYPE:'',
    DATEDEBUT:'',
    ENTREPRISE:'',
    DEPARTEMENTSERVICE:'',
    IDCANDIDAT:''
  }

  constructor(private http:HttpClient) { }


  createNewExperience(ExperienceP:Experience){
    return new Promise((resolve, reject) => 
      {
        this.http.post<Experience>(this.apiURL,ExperienceP)
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

  getExperiences(){
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

  getExperience(IDEXPERIENCE:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/"+IDEXPERIENCE)
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

  getExperienceWithCandidat(IDCANDIDAT:string){
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


  updateExperience(ExperienceP:Experience){
    return new Promise((resolve, reject) => {
        this.http.put(this.apiURL+"/"+ExperienceP.IDEXPERIENCE,ExperienceP).subscribe(
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
