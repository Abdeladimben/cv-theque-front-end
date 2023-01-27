import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offre } from 'src/app/core/models/offre';
import { OffreService } from 'src/app/core/services/offre.service';

import { PostulerService } from 'src/app/core/services/postuler.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {


  offres:Offre[]=[];
  type:any=localStorage.getItem('type');
  postulations:Array<any>=[];
  nombreCandidat:number=0;
  nombreOffre:number=0;
  constructor(private offreService:OffreService,private postulerService:PostulerService,private router:Router) { }

  ngOnInit(){
    localStorage.removeItem('uuidoffre_recherche');
    this.offreService.getOffres()
      .then(
        (res:any) => {
          this.offres=res;
          this.postulerService.count().then((res:any)=>{
            this.nombreCandidat=res;
          }).catch((err:any)=>{
            console.log(err)
          })
        }
      ).catch(
        (err:any) => {
          console.log(err);
        }
      )
  }

  supprimer(uuid:any){
    this.offreService.deleteOffre(uuid)
    .then(
      (res:any) => {
        console.log(res);
        this.offres=this.offres.filter((offres:any) =>offres.uuid!==uuid);
        this.nombreOffre--;
      }
    ).catch(
      (err:any) => {
        console.log(err);
      }
    )
  }


  goToCandidats(uuidoffre:any){
    localStorage.setItem('uuidoffre_recherche',uuidoffre);
    this.router.navigate(['admin/candidat']);
  }


}
