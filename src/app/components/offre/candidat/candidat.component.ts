import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/interfaces/candidat';
import { CentreInteret } from 'src/app/interfaces/centre-interet';
import { Cv } from 'src/app/interfaces/cv';
import { Experience } from 'src/app/interfaces/experience';
import { Formation } from 'src/app/interfaces/formation';
import { Langue } from 'src/app/interfaces/langue';
import { Specialite } from 'src/app/interfaces/specialite';
import { CandidatService } from 'src/app/services/candidat.service';
import { CentreInteretService } from 'src/app/services/centre-interet.service';
import { CvService } from 'src/app/services/cv.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { FormationService } from 'src/app/services/formation.service';
import { LangueService } from 'src/app/services/langue.service';
import { PostulerService } from 'src/app/services/postuler/postuler.service';
import { SpecialiteService } from 'src/app/services/specialite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {

  
  cvs:Cv[]=[];
  IDCANDIDATS:any[]=[];
  CANDIDATS:any[]=[];
  resultCandidat:any[]=[];
  Affichage:any[]=[];
  itemsearch:any[]=['DIPLOME','SPECIALITE','INSTITUT'];
  item:string='';

  formationListe:any[]=[];
  experienceListe:any[]=[];
  specialiteListe:any[]=[];
  langueListe:any[]=[];
  centreInteretListe:any[]=[];

  diplome:string='';
  institut:string='';
  anneeScolaire:string='';
  specialite:string='';
  typeExperience:string='';
  dateDebut:string='';
  entreprise:string='';

  CandidatAllInformation:any =
  {
    IDCANDIDAT:'',
    NOM:'',
    PRENOM:'',
    DATE_NAISSANCE:'',
    TELEPHONE:'',
    EMAIL:'',
    DIPLOME:'',
    INSTITUT:'',
    ANNEE_SCOLAIRE:'',
    SPECIALITE:'',
    TYPE_EXPERIENCE:'',
    DATE_DEBUT:'',
    ENTREPRISE:''

  };

  showUpdateInputs=false;
  showCandidat=false;
  idArticle:any;
  searchText='';
  navheight='100vh';

  myCandidat:Candidat={
    IDCANDIDAT:'',
    NOM:'',
    PRENOM:'',
    DATENAISSANCE:'',
    VILLE:'',
    NATIONALITE:'',
    ADRESSE:'',
    TELEPHONE:'',
    EMAIL:''
  }

  myFormation:Formation={
    IDFORMATION:'',
    DIPLOME:'',
    INSTITUT:'',
    ANNEESCOLAIRE:'',
    MENTION:'',
    IDCANDIDAT:'',
  }

  myExperience:Experience={
    IDEXPERIENCE:'',
    TYPE:'',
    DATEDEBUT:'',
    ENTREPRISE:'',
    DEPARTEMENTSERVICE:'',
    IDCANDIDAT:''
  }

  mySpecialite:Specialite={
    IDSPECIALITE:'',
    INTITULE:'',
    IDCANDIDAT:''
  }

  myLangue:Langue={
    IDLANGUE:'',
    NOM:'',
    NIVEAU:'',
    IDCANDIDAT:''
  }

  myCentreInteret:CentreInteret={
    IDCENTREINTERET:'',
    INTITULE:'',
    IDCANDIDAT:''
  }

  constructor(private router: Router,public cvService: CvService,public candidatService: CandidatService,public userService: UserService,public centreInteretService:CentreInteretService,public experienceService:ExperienceService,public formationService:FormationService,public langueService:LangueService,public specialiteService:SpecialiteService,public postulerService:PostulerService) { 
    
  }

  ngOnInit(){
    this.getIdCandidatByOffre();
  }

  getIdCandidatByOffre(){
    this.postulerService.getCandidatPostulerByOffre(localStorage.getItem('idoffre_recherche')+'').
      then((res:any)=>{
        this.IDCANDIDATS=res?.data?.map((CANDIDAT:any)=>CANDIDAT.IDCANDIDAT);
        console.log(this.IDCANDIDATS);
        this.remplir();
      })
  }
  remplir(){
    this.CANDIDATS=[];
    this.candidatService.getCandidatsByListOfID(this.IDCANDIDATS).then((res:any)=>{
      this.CANDIDATS=res.data;
      console.log(res);
      console.log(this.CANDIDATS);
    }).catch((err:any)=>{
      console.log(err);
    })
    
    
    
  }




  
  resetSearchText() {
    this.searchText='';
  }

  

  rechercher(){
    if(this.item=="DIPLOME"){
      this.Affichage=this.resultCandidat.filter((candidat: any)=>candidat.DIPLOME.toLowerCase().includes(this.searchText));
    }else if(this.item=="SPECIALITE"){
      this.Affichage=this.resultCandidat.filter((candidat: any)=>candidat.SPECIALITE.toLowerCase().includes(this.searchText));
    }else if(this.item=="INSTITUT"){
      this.Affichage=this.resultCandidat.filter((candidat: any)=>candidat.INSTITUT.toLowerCase().includes(this.searchText));
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
      this.experienceListe.forEach((exp:any)=>{
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
    this.navheight='100vh';
    this.showCandidat=true;

  }

}
