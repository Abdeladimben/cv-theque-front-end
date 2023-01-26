import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from 'src/app/components/admin_pages/admin_default/dashbord/dashbord.component';
import { PublierComponent } from 'src/app/components/admin_pages/admin_default/publier/publier.component';
import { OffresComponent } from 'src/app/components/admin_pages/admin_default/offres/offres.component';
import { CandidatComponent } from 'src/app/components/admin_pages/admin_default/candidat/candidat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from '../userModule/user.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DashbordComponent,
    PublierComponent,
    CandidatComponent,
    OffresComponent
  
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
    MatRadioModule,
    RouterModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    UserModule
  ],
  exports:[
    DashbordComponent,
    PublierComponent,
    CandidatComponent,
    OffresComponent, 
  ],
})
export class AdminModule { }
