import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor  {
    private refreshTokenSubject:BehaviorSubject<any>=new BehaviorSubject<any>(null);
    constructor(
        private httpErrorHandler:HttpErrorHandlerService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("wewew")
        const accessToken = localStorage.getItem('accesstoken');
        if (!accessToken) {
            return next.handle(req);
        }
        const accessReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
        });
        console.log("accessReq")
        console.log(accessReq)
        return next.handle(accessReq)
    }

}





