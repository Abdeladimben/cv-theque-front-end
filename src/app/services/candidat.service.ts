import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Candidat } from '../interfaces/candidat';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {


  myCandidat:Candidat={
    uuid: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: '',
    adresse: '',
    email: '',
    telephone: '',
    description: '',

    centreInterets: [],
    experiences: [],
    formations: [],
    langues: [],
    specialites: [],
    intitule: ''
  }


  apiURL: string=environment.url+"/candidat";
  constructor(private http:HttpClient) {

  }

  createNewCandidat(candidatP:Candidat){
    return new Promise((resolve, reject) =>
      {
        this.http.post<Candidat>(this.apiURL+"/create",candidatP)
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

  getCandidat(uuid:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/"+uuid)
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
  getCandidatByAccountToken(){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/account")
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
      let headers=new HttpHeaders();
      let params=new HttpParams();
      headers.set("Content-Type","");
      headers.set("Accept","multipart/form-data");
        this.http.put(this.apiURL+"/update",candidatP,{params,headers}).subscribe(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
            }
        )
    })
  }


  deleteCandidat(uuid:string){
    return new Promise((resolve, reject) =>{
      this.http.delete(this.apiURL+"/delete/"+uuid)
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
