import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { HttpErrorHandlerService } from "../http_error/http-error-handler.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor{

    constructor(private httpErrorHandler:HttpErrorHandlerService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError((err:any):Observable<any>=>{
            console.log('error HttpErrorInterceptor')
            this.httpErrorHandler.handle(err.status);
            return new Observable;
        }));
    }

}
