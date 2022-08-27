import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL: string = 'http://localhost:3000/account'
  user:User={
    EMAIL:'',
    PASSWORD:'',
    TYPE:''
  }
  constructor(private http:HttpClient) { }

  createNewUser(userP:User){
    return new Promise((resolve, reject) => 
      {
        this.http.post<User>(this.apiURL,userP)
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

  public getUsers(email:string){
    return new Promise((resolve,reject) =>
      {
        this.http.get(this.apiURL+"/"+email)
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

  public deleteUser(email:string){
    return new Promise((resolve,reject) =>
      {
        this.http.delete(this.apiURL+"/"+email)
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
