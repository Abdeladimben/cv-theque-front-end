import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

import { CandidatInformationComponent } from './pages/candidat-information/candidat-information.component';
import { CreateaccountComponent } from './account/createaccount/createaccount.component';
import { LoginComponent } from './account/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AccueilComponent } from './pages/accueil/accueil/accueil.component';
import { PublierComponent } from './components/offre/publier/publier.component';
import { OffresComponent } from './components/offre/offres/offres.component';
import { CandidatComponent } from './components/offre/candidat/candidat.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UtilisateurOffresComponent } from './components/offre/utilisateur-offres/utilisateur-offres.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CandidatInformationComponent,
    CreateaccountComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ProfilComponent,
    AccueilComponent,
    PublierComponent,
    OffresComponent,
    CandidatComponent,
    NavbarComponent,
    UtilisateurOffresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
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
    provideFirebaseApp(() => initializeApp({})),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
