import { HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorHandlerService {
    
    constructor(private snackBar:MatSnackBar, private readonly router:Router){}
    
    handle(statusCode:any){
        console.log('handle')
        if (statusCode==400){
            this.snackBar.open("Your Error 400", "ok");
        }else if(statusCode==401){
            console.log(statusCode);
            console.log(this.router.url);
            if(this.router.url=="/home/login"){
                this.snackBar.open("Votre mot de passe ou email est incorrect", "ok");
            }else{
                this.snackBar.open("Votre session est fini", "ok");
                this.logOut();
            }
            
        }else if(statusCode==403){
            console.log(statusCode);
            console.log(localStorage.getItem("accesstoken"));
            this.snackBar.open("Your Error 403", "ok");
        }else if(statusCode==404){
            console.log(statusCode);
            console.log(1);
            this.snackBar.open("Your Error 404", "ok");
        }else if(statusCode==500){
            console.log(statusCode);
            console.log(1);
            this.snackBar.open("Your Error 500", "ok");
        }else if(statusCode==502){
            console.log(statusCode);
            console.log(1);
            this.snackBar.open("Your Error 502", "ok");
        }else if(statusCode==503){
            console.log(statusCode);
            console.log(1);
            this.snackBar.open("Your Error 503", "ok");
        }else if(statusCode==504){
            console.log(statusCode);
            console.log(1);
            this.snackBar.open("Your Error 504", "ok");
        }
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler){
        localStorage.setItem('isRefreshed','true');
        const refreshToken = localStorage.getItem('refreshtoken');
        const refreshReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${refreshToken}`),
        });
        return next.handle(refreshReq);
    }

    logOut(){
        localStorage.clear();
        this.router.navigate(['/home']);
    }

}


