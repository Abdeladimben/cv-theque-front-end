import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorHandlerService } from 'src/app/helper/http_error/http-error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/helper/auth_interceptor/auth-interceptor';
import { HttpErrorInterceptor } from 'src/app/helper/error-auth-interceptor/error-interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],providers: [
    { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor , multi: true },
    { provide: HTTP_INTERCEPTORS, useClass:HttpErrorInterceptor, multi: true },

    HttpErrorHandlerService
  ],
})
export class ServiceModule { }
