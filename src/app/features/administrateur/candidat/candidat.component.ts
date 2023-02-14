import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/core/models/candidat';

import { CandidatService } from 'src/app/core/services/candidat.service';



import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PostulerService } from 'src/app/core/services/postuler.service';
import { CentreInteret } from 'src/app/core/models/centre-interet';
import { Experience } from 'src/app/core/models/experience';
import { Formation } from 'src/app/core/models/formation';
import { Langue } from 'src/app/core/models/langue';
import { Specialite } from 'src/app/core/models/specialite';
import { DownloadCvService } from 'src/app/core/services/download-cv.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {

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
    uuid: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: '',
    adresse: '',
    telephone: '',
    propos: '',

    centreInterets: [],
    experiences: [],
    formations: [],
    langues: [],
    specialites: [],
    intitule: ''
  }

  myFormation:Formation={
    uuid:'',
    dateDebut:new Date(),
    dateFin:new Date(),
    diplome:'',
    institut:'',
    mention:'',
    niveau:''
  }

  myExperience:Experience={
    uuid:'',
    role:'',
    dateDebut:new Date(),
    dateFin:new Date(),
    entreprise:'',
    description_experience:''
  }

  mySpecialite:Specialite={
    uuid:'',
    intitule:''
  }

  myLangue:Langue={
    uuid:'',
    nom:'',
    niveau:''
  }

  myCentreInteret:CentreInteret={
    uuid:'',
    intitule:''
  }

  nom_fichier:any;

  dataSource:any;
  displayedColumns: string[] = ['NOM', 'PRENOM', 'TELEPHONE', 'EMAIL','CONTROLE'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  uuid_candidat:any;

  constructor(private router: Router,
              public candidatService: CandidatService,
              public userService: UserService,
              public postulerService:PostulerService,
              public downloadCvService:DownloadCvService,
              public dialog: MatDialog
              ) {

  }

  ngOnInit(){
    this.remplir();
  }

  getIdCandidatByOffre(){
    this.postulerService.getCandidatPostulerByOffre(localStorage.getItem('uuidoffre_recherche')+'').
      then((res:any)=>{
        console.log(res)
        this.CANDIDATS=res;
      })
  }

  remplir(){
    this.CANDIDATS=[];
    this.postulerService.getCandidatPostulerByOffre(localStorage.getItem('uuidoffre_recherche')+'').then((res:any)=>{
      this.CANDIDATS=res;
      this.dataSource=new MatTableDataSource<Candidat>(this.CANDIDATS);
      this.dataSource.paginator = this.paginator;
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
      this.Affichage=this.resultCandidat.filter((candidat: any)=>candidat.diplome.toLowerCase().includes(this.searchText));
    }else if(this.item=="SPECIALITE"){
      this.Affichage=this.resultCandidat.filter((candidat: any)=>candidat.Specialite.toLowerCase().includes(this.searchText));
    }else if(this.item=="INSTITUT"){
      this.Affichage=this.resultCandidat.filter((candidat: any)=>candidat.institut.toLowerCase().includes(this.searchText));
    }
  }



  afficher(i:any,uuid:string){
    this.uuid_candidat=uuid;
    this.showCandidat=true;
    console.log(this.showCandidat)
    console.log("this.showCandidat")
  }



  telechargerCV(){
    this.downloadCvService.downloadFileCvByUuid(this.uuid_candidat).then((res:any)=>{
      this.downloadCvService.downloadFile(res.body,"CV_"+this.nom_fichier.toUpperCase());
    }).catch((err:any)=>{
      console.log(err)
    })
  }

  
  telechargerLettre(){
    this.downloadCvService.downloadFileLettreByUuid(this.uuid_candidat).then((res:any)=>{
      this.downloadCvService.downloadFile(res.body,"Lettre_"+this.nom_fichier.toUpperCase());
    }).catch((err:any)=>{
      console.log(err)
    })
  }

  openDialog(target_modal: any,uuid:string,nom:string,prenom:string) {
    this.uuid_candidat=uuid;
    this.nom_fichier=nom+"_"+prenom;
    this.dialog.open(target_modal);
  }


}
