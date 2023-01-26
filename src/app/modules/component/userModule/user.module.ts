import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilisateurOffresComponent } from 'src/app/components/default-user/utilisateur-offres/utilisateur-offres.component';
import { ProfilComponent } from 'src/app/components/default-user/profil/profil.component';
import { CandidatInformationComponent } from 'src/app/components/default-user/candidat-information/candidat-information.component';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import {DatePipe} from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorFormComponent } from 'src/app/helper/error-form/error-form.component';

@NgModule({
  declarations: [
    CandidatInformationComponent,
    ProfilComponent,
    UtilisateurOffresComponent,
    ErrorFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatDialogModule,
    MatRadioModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatSidenavModule,
    MatStepperModule
  ],
  exports:[
    CandidatInformationComponent,
    ProfilComponent,
    UtilisateurOffresComponent,
    ErrorFormComponent
  ],
  providers: [DatePipe]
})
export class UserModule { }
