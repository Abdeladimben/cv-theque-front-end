import { HtmlTagDefinition } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ipostuler } from 'src/app/interfaces/ipostuler';
import { OffreService } from 'src/app/services/offre/offre.service';
import { PostulerService } from 'src/app/services/postuler/postuler.service';

@Component({
  selector: 'app-utilisateur-offres',
  templateUrl: './utilisateur-offres.component.html',
  styleUrls: ['./utilisateur-offres.component.css']
})
export class UtilisateurOffresComponent implements OnInit {

  offres:any;
  type:any=localStorage.getItem('type');
  postulations:Array<any>=[];

  constructor(private offreService:OffreService,private postulerService:PostulerService,private router:Router) { }

  async ngOnInit(): Promise<any> {
    var btn ;
    localStorage.removeItem('idoffre_recherche');
    await this.offreService.getOffres()
      .then(
        (res:any) => {
          this.offres=res.data;
          this.postulerService.getPostulationsByCandidat(localStorage.getItem('idcandidat')+'')
            .then(
              (res:any) => {
                this.postulations=res.data?.map((post:any) => post.IDOFFRE);
                console.log(this.postulations);
              }
            ).catch(
              (err) => {
                console.log(err)
              }
            )
        }
      ).catch(
        (err:any) => {
          console.log(err);
        }
      )
  }

  

  postuler(idoffre:any){
    let post:Ipostuler={
      IDOFFRE:idoffre,
      IDCANDIDAT:localStorage.getItem('idcandidat')+'',
      DATEPOSTULER:new Date()
    }
    console.log(post);
    this.postulerService.Postuler(post)
    .then(
      (res:any) => {
        console.log(res);
        if(this.postulations==undefined || this.postulations==null){
          this.postulations=[idoffre];
        }else{
          this.postulations.push(idoffre);
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
