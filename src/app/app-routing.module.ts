import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateaccountComponent } from './account/createaccount/createaccount.component';
import { LoginComponent } from './account/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CandidatComponent } from './components/offre/candidat/candidat.component';
import { OffresComponent } from './components/offre/offres/offres.component';
import { PublierComponent } from './components/offre/publier/publier.component';
import { UtilisateurOffresComponent } from './components/offre/utilisateur-offres/utilisateur-offres.component';
import { AccueilComponent } from './pages/accueil/accueil/accueil.component';
import { CandidatInformationComponent } from './pages/candidat-information/candidat-information.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilComponent } from './pages/profil/profil.component';




const routes: Routes = [
  {path:'', redirectTo: 'home',pathMatch:"full"},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'createAccount',component:CreateaccountComponent},
  {path:'candidatInformation',component:CandidatInformationComponent},
  {path:'admin',component:AdminComponent},
  {path:'profil',component:ProfilComponent},
  {path:'offres',component:OffresComponent},
  {path:'utilisateurOffres',component:UtilisateurOffresComponent},
  {path:'accueil',component:AccueilComponent},
  {path:'publier',component:PublierComponent},
  {path:'candidat',component:CandidatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
