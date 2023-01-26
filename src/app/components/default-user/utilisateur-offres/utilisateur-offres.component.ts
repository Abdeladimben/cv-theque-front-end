import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ipostuler } from 'src/app/interfaces/ipostuler';
import { Offre } from 'src/app/interfaces/offre';
import { OffreService } from 'src/app/services/offre/offre.service';
import { PostulerService } from 'src/app/services/postuler/postuler.service';

@Component({
  selector: 'app-utilisateur-offres',
  templateUrl: './utilisateur-offres.component.html',
  styleUrls: ['./utilisateur-offres.component.css']
})
export class UtilisateurOffresComponent implements OnInit {

  offres:Offre[]=[];
  type:any=localStorage.getItem('type');
  postulations:Array<Ipostuler>=[];
  offreUuids:any[]=[];

  constructor(private offreService:OffreService,private postulerService:PostulerService) { }


  ngOnInit(){

    this.offreService.getOffres().then((res:any)=>{
      console.log(1)
      this.offres=res;
      this.postulerService.getPostulationsByCandidat(localStorage.getItem('uuid_candidat')+'').then((result:any)=>{
        this.postulations=result;
        this.postulations.forEach(post => {
          if(this.offreUuids==null){
            this.offreUuids=[post.offre.uuid];
          }else{
            this.offreUuids.push(post.offre.uuid);
          }
        });
        console.log(this.postulations)
      }).catch((error:any)=>{
        console.log(error)
      })
    }).catch((err:any)=>{
      console.log(err)
    })

  }

  

  postuler(uuid_offre:any){
    this.postulerService.Postuler(uuid_offre)
    .then(
      (res:any) => {
        console.log(res);
        if(this.postulations==undefined || this.postulations==null){
          this.offreUuids=[uuid_offre];
        }else{
          this.offreUuids.push(uuid_offre);
        }
        
      }
    ).catch(
      (err:any) => {
        console.log(err);
      }
    )
  }


  attrrDisable(idoffre:any){
    if(this.postulations==undefined){
      return false;
    }else if(this.postulations.indexOf(idoffre) == -1){
      return false;
    }else{
      return true;
    }
  }


}
