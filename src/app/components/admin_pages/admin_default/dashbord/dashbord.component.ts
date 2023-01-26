import { Component, OnInit, ViewChild } from '@angular/core';
import { Candidat } from 'src/app/interfaces/candidat';

import { CandidatService } from 'src/app/services/candidat.service';

import { UserService } from 'src/app/services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DownloadCvService } from 'src/app/services/download-cv.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {


  CANDIDATS:Candidat[]=[];
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
    uuid: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: '',
    adresse: '',
    telephone: '',
    description: '',

    centreInterets: [],
    experiences: [],
    formations: [],
    langues: [],
    specialites: [],
    intitule: ''
  }

  uuid_candidat:any;

  nom_fichier:any;

  dataSource:any;
  displayedColumns: string[] = ['NOM', 'PRENOM', 'TELEPHONE', 'EMAIL','CONTROLE'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    public candidatService: CandidatService,
    public userService: UserService,
    public downloadCvService:DownloadCvService,
    public dialog: MatDialog
    ) {
      
    }

  ngOnInit(): void {
    console.log("this.userService.user");
    console.log(this.userService.user.type);
    
      this.remplir();


  }


  remplir():any{
    this.CANDIDATS=[];
    this.candidatService.getCandidats().then((res:any)=>{
      this.CANDIDATS=this.resultCandidat=res;
      this.dataSource=new MatTableDataSource<Candidat>(this.CANDIDATS);
      this.dataSource.paginator = this.paginator;
      console.log(this.CANDIDATS);
      return this.CANDIDATS;
    }).catch((err:any)=>{
      console.log(err);
      return ;
    })



  }


  supprimer(uuid:any,i:number){
    this.candidatService.deleteCandidat(uuid).then((res:any)=>{
      console.log(res);
      this.CANDIDATS=this.resultCandidat=this.resultCandidat.filter((element:any)=> element.uuid!=uuid);
      this.dataSource.data.splice(i, 1);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
    }).catch((err)=>{
      console.log(err);
    })

  }


  resetSearchText() {
    this.searchText='';
  }

  async filterData(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter =  filterValue.trim().toLowerCase();
  }

  async applyFilter(event: Event){
    console.log(event);
    if(this.item=="NOM"){
      this.CANDIDATS=this.resultCandidat.filter((candidat: any)=>candidat.nom.toLowerCase().includes(this.searchText));
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data:any, filter:any)=>{
        console.log(filter);
        return data.nom.toLowerCase().includes(filter);
      }
      this.filterData(event);
    }else if(this.item=="PRENOM"){
      this.CANDIDATS=this.resultCandidat.filter((candidat: any)=>candidat.prenom.toLowerCase().includes(this.searchText));
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data:any, filter:any)=>{
        console.log(filter);
        return data.prenom.toLowerCase().includes(filter);
      }
      this.filterData(event);
    }else if(this.item=="EMAIL"){
      this.CANDIDATS=this.resultCandidat.filter((candidat: any)=>candidat.email.toLowerCase().includes(this.searchText));
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data:any, filter:any)=>{
        console.log(filter);
        return data.email.toLowerCase().includes(filter);
      }
      this.filterData(event);
    }
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

  afficher(i:any,uuid:string){
    this.uuid_candidat=uuid;
    console.log('i = '+i)
    this.showCandidat=true;
    console.log(this.showCandidat)
  }






}

