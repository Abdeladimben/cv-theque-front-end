import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateaccountComponent } from './components/account/createaccount/createaccount.component';
import { LoginComponent } from './components/account/login/login.component';
import { DashbordComponent } from './components/admin_pages/admin_default/dashbord/dashbord.component';
import { CandidatComponent } from './components/admin_pages/admin_default/candidat/candidat.component';
import { OffresComponent } from './components/admin_pages/admin_default/offres/offres.component';
import { PublierComponent } from './components/admin_pages/admin_default/publier/publier.component';
import { UtilisateurOffresComponent } from './components/default-user/utilisateur-offres/utilisateur-offres.component';
import { CandidatInformationComponent } from './components/default-user/candidat-information/candidat-information.component';
import { HomeComponent } from './components/account/home/home.component';
import { ProfilComponent } from './components/default-user/profil/profil.component';
import { AuthGuard } from './helper/auth.guard';
import { DefaultComponent } from './components/admin_pages/admin_default/default.component';
import { DefaultUserComponent } from './components/default-user/default-user.component';
import { DefaultHomeComponent } from './components/account/default-home/default-home.component';
import { SpinnertestComponent } from './spinnertest/spinnertest.component';

  const routes: Routes = [
    {path:'', redirectTo: 'home',pathMatch:"full"},
    {path:'spinner', component:SpinnertestComponent},
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
