import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FooterComponent } from 'src/app/components/layout/footer/footer.component';
import { TopBarComponent } from 'src/app/components/layout/top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { DefaultHomeComponent } from 'src/app/components/account/default-home/default-home.component';
import { DefaultUserComponent } from 'src/app/components/default-user/default-user.component';
import { DefaultComponent } from 'src/app/components/admin_pages/admin_default/default.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CreateaccountComponent } from 'src/app/components/account/createaccount/createaccount.component';
import { HomeComponent } from 'src/app/components/account/home/home.component';
import { LoginComponent } from 'src/app/components/account/login/login.component';
import { NavbarComponent } from 'src/app/components/layout/navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';



@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    CreateaccountComponent,
    TopBarComponent,
    FooterComponent,
    DefaultComponent,
    DefaultHomeComponent,
    DefaultUserComponent
    
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
    MatDialogModule,
    MatStepperModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatSidenavModule,
  ],
  exports:[    
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    CreateaccountComponent,
    TopBarComponent,
    FooterComponent,
    DefaultComponent,
    DefaultHomeComponent,
    DefaultUserComponent

  ],
  providers: [DatePipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LayotModule { }
