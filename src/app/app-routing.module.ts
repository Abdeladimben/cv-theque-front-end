import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateaccountComponent } from './features/account/createaccount/createaccount.component';

import { AuthGuard } from './core/services/auth.guard';
import { HomeComponent } from './features/account/home/home.component';
import { LoginComponent } from './features/account/login/login.component';
import { CandidatComponent } from './features/administrateur/candidat/candidat.component';
import { DashbordComponent } from './features/administrateur/dashbord/dashbord.component';
import { OffresComponent } from './features/administrateur/offres/offres.component';
import { PublierComponent } from './features/administrateur/publier/publier.component';
import { DefaultComponent } from './features/default/default-administrateur/default.component';
import { DefaultHomeComponent } from './features/default/default-home/default-home.component';
import { DefaultUserComponent } from './features/default/default-user/default-user.component';
import { CandidatInformationComponent } from './features/utilisateur/candidat-information/candidat-information.component';
import { ProfilComponent } from './features/utilisateur/profil/profil.component';
import { UtilisateurOffresComponent } from './features/utilisateur/utilisateur-offres/utilisateur-offres.component';


  const routes: Routes = [
    {path:'', redirectTo: 'home',pathMatch:"full"},
    {path:'home',component:DefaultHomeComponent,
      children:[
        {path:'',component:HomeComponent},
        {path:'login',component:LoginComponent},
        {path:'createAccount',component:CreateaccountComponent}
      ]
    },

    {path : 'admin',component:DefaultComponent,canActivate:[AuthGuard],
      children:[
        {path:'dashbord',component:DashbordComponent},
        {path:'offres',component:OffresComponent},
        {path:'publier',component:PublierComponent},
        {path:'candidat',component:CandidatComponent}
      ]
    },
    {path : 'user',component:DefaultUserComponent,canActivate:[AuthGuard],
      children:[
        {path:'candidatInformation',component:CandidatInformationComponent},
        {path:'profil',component:ProfilComponent},
        {path:'offres',component:UtilisateurOffresComponent},
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
