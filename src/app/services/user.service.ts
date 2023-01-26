import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  user:User={
    uuid:'',
    email:'',
    password:'',
    type:''
  }
  private userSubject:BehaviorSubject<any>=new BehaviorSubject<any>({});
  public myUser: Observable<User|null>|any;
  
  apiURL: string=environment.url+"/account";

  constructor(private http:HttpClient,private router:Router) {

  }

  getUserConnecte(){
    if(this.getAccessToken()!=null || this.getAccessToken()!=undefined){
      this.http.get(this.apiURL+"/get").pipe(tap((res:User)=>{

        if((this.router.url=='admin' && res.type=="ROLE_ADMIN") || (this.router.url=='user' && res.type=="ROLE_USER")){
          this.userSubject.next(res);
          return true;
        }else{
          return false;
        }
      }))
    }
    return true;
  }

  isLoggedIn(){
      console.log("get user connecté 2");
      return new Promise((resolve , reject)=>{
        this.http.get(this.apiURL+"/get").subscribe(
          (res:any)=>{
            this.userSubject.next(res);
            resolve(res);
          },
          (err:any)=>{
            reject(err);
          }
        )
      })
  }

  public get UserValue():User{
    console.log("this.userSubject")
    console.log(this.myUser);
    return this.userSubject?.value;
  }



  login(account:any){
    console.log(`${this.apiURL}/auth`);

    return new Promise((resolve, reject) => 
      {
        this.http.post<any>(`${this.apiURL}/auth`,account)
        .subscribe
        (
          res =>{
            resolve(res);
            this.userSubject?.next(res.accountDTO);
            this.myUser=this.userSubject.asObservable();
          },err=>{
            reject(err);
          }
        )
      }
    ) 
  }

  setAccessToken(accesstoken: string){
    localStorage.setItem("accesstoken",accesstoken)
  }

  logOut(){
    localStorage.clear();
    this.userSubject=new BehaviorSubject<User>({});
    this.router.navigate(['/home']);
  }


  getAccessToken()
  {
    return localStorage.getItem("accesstoken");
  }

  createNewUser(userP:User){
    return new Promise((resolve, reject) => 
      {
        this.http.post<User>(this.apiURL+'/create',userP)
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

}
