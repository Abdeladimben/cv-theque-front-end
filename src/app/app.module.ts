import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatSidenavModule } from '@angular/material/sidenav'

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CoreModule } from './core/core.module';
import { CreateAccountModule } from './features/account/createaccount/create-account.module';
import { HomeModule } from './features/account/home/home.module';
import { LoginModule } from './features/account/login/login.module';
import { CandidatModule } from './features/administrateur/candidat/candidat.module';
import { DashbordModule } from './features/administrateur/dashbord/dashbord.module';
import { OffresModule } from './features/administrateur/offres/offre.module';
import { PublierModule } from './features/administrateur/publier/publier.module';
import { DefaultAdministrateurModule } from './features/default/default-administrateur/default-administrateur.module';
import { DefaultHomeModule } from './features/default/default-home/default-home.module';
import { DefaultUserModule } from './features/default/default-user/default-user.module';
import { CandidatInformationModule } from './features/utilisateur/candidat-information/candidat-information.module';
import { ProfilModule } from './features/utilisateur/profil/profil.module';
import { UtilisateurOffresModule } from './features/utilisateur/utilisateur-offres/utilisateur-offres.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    CoreModule,
    CreateAccountModule,
    HomeModule,
    LoginModule,
    CandidatModule,
    DashbordModule,
    OffresModule,
    PublierModule,
    DefaultAdministrateurModule,
    DefaultHomeModule,
    DefaultUserModule,
    CandidatInformationModule,
    ProfilModule,
    UtilisateurOffresModule,
    SharedModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
