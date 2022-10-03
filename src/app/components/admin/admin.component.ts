import { Component, OnInit } from '@angular/core';
import { Candidat } from 'src/app/interfaces/candidat';

import { CandidatService } from 'src/app/services/candidat.service';
import { CentreInteretService } from 'src/app/services/centre-interet.service';
import { CvService } from 'src/app/services/cv.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { FormationService } from 'src/app/services/formation.service';
import { LangueService } from 'src/app/services/langue.service';
import { SpecialiteService } from 'src/app/services/specialite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  CANDIDATS:any[]=[];
  resultCandidat:any[]=[];
  itemsearch:any[]=['NOM','PRENOM','EMAIL'];
  item:string='';

  formationListe:any[]=[];
  experienceListe:any[]=[];
  specialiteListe:any[]=[];
  langueListe:any[]=[];
  centreInteretListe:any[]=[];

  showCandidat=false;
  searchText='';

  myCandidat:Candidat={
    IDCANDIDAT:'',
    NOM:'',
    PRENOM:'',
    DATENAISSANCE:'',
    LIEUNAISSANCE:'',
    NATIONALITE:'',
    ADRESSE:'',
    TELEPHONE:'',
    EMAIL:''
  }


  constructor(public cvService: CvService,public candidatService: CandidatService,public userService: UserService,public centreInteretService:CentreInteretService,public experienceService:ExperienceService,public formationService:FormationService,public langueService:LangueService,public specialiteService:SpecialiteService) { }

  ngOnInit(): void {


      this.remplir();


  }


  remplir(){
    this.CANDIDATS=[];
    this.candidatService.getCandidats().then((res:any)=>{
      this.CANDIDATS=this.resultCandidat=res.data;

      console.log(this.CANDIDATS);
    }).catch((err:any)=>{
      console.log(err);
    })



  }


  supprimer(email:any){
    this.userService.deleteUser(email).then((res:any)=>{
      console.log(res);
      this.CANDIDATS=this.resultCandidat=this.resultCandidat.filter((element:any)=> element.EMAIL!=email.EMAIL);

    }).catch((err)=>{
      console.log(err);
    })

  }


  resetSearchText() {
    this.searchText='';
  }



  rechercher(){
    if(this.item=="NOM"){
      this.CANDIDATS=this.resultCandidat.filter((candidat: any)=>candidat.NOM.toLowerCase().includes(this.searchText));
    }else if(this.item=="PRENOM"){
      this.CANDIDATS=this.resultCandidat.filter((candidat: any)=>candidat.PRENOM.toLowerCase().includes(this.searchText));
    }else if(this.item=="EMAIL"){
      this.CANDIDATS=this.resultCandidat.filter((candidat: any)=>candidat.EMAIL.toLowerCase().includes(this.searchText));
    }
  }



  afficher(i:any){
    this.candidatService.getCandidat(this.CANDIDATS[i]).then((res:any)=>{
      this.myCandidat=res?.data[0];
      this.myCandidat.DATENAISSANCE=this.myCandidat.DATENAISSANCE.slice(0,10);
    }).catch((err:any)=>{
      console.log(err);
    })

    this.formationService.getFormationWithCandidat(this.CANDIDATS[i].IDCANDIDAT).then((res:any)=>{
      this.formationListe=res?.data;
    }).catch((err:any)=>{
      console.log(err);
    })

    this.experienceService.getExperienceWithCandidat(this.CANDIDATS[i].IDCANDIDAT).then((res:any)=>{

      this.experienceListe=res?.data;
      this.experienceListe?.forEach((exp:any)=>{
        exp.DATEDEBUT=exp.DATEDEBUT.slice(0,10);
      })
      console.log(this.experienceListe);
    }).catch((err:any)=>{
      console.log(err);
    })

    this.specialiteService.getSpecialiteWithCandidat(this.CANDIDATS[i].IDCANDIDAT).then((res:any)=>{
      this.specialiteListe=res?.data;
    }).catch((err:any)=>{
      console.log(err);
    })

    this.langueService.getLangueWithCandidat(this.CANDIDATS[i].IDCANDIDAT).then((res:any)=>{
      this.langueListe=res?.data;
    }).catch((err:any)=>{
      console.log(err);
    })

    this.centreInteretService.getCentreInteretWithCandidat(this.CANDIDATS[i].IDCANDIDAT).then((res:any)=>{
      this.centreInteretListe=res?.data;
    }).catch((err:any)=>{
      console.log(err);
    })
    this.showCandidat=true;

  }




}

