import { NgModule } from "@angular/core";
import { PostulerService } from "./services/postuler.service";
import { UserService } from "./services/user.service";
import { OffreService } from "./services/offre.service";
import { HttpErrorHandlerService } from "./services/http-error-handler.service";
import { HttpErrorInterceptor } from "./services/error-interceptor.service";
import { DownloadCvService } from "./services/download-cv.service";
import { CandidatService } from "./services/candidat.service";
import { AuthGuard } from "./services/auth.guard";
import { AuthInterceptor } from "./services/auth-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DatePipe } from "@angular/common";


@NgModule({
    declarations: [


    ],
    imports: [


    ],
    providers: [
        PostulerService,
        UserService,
        OffreService,
        HttpErrorHandlerService,
        HttpErrorInterceptor,
        DownloadCvService,
        CandidatService,
        AuthGuard,
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor , multi: true },
        { provide: HTTP_INTERCEPTORS, useClass:HttpErrorInterceptor, multi: true },
    ],
})
export class CoreModule { }

