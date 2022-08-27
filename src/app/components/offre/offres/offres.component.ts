import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ipostuler } from 'src/app/interfaces/ipostuler';
import { OffreService } from 'src/app/services/offre/offre.service';
import { PostulerService } from 'src/app/services/postuler/postuler.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {


  offres:any;
  type:any=localStorage.getItem('type');
  postulations:Array<any>=[];
  nombreCandidat:number=0;
  nombreOffre:number=0;
  constructor(private offreService:OffreService,private postulerService:PostulerService,private router:Router) { }

  async ngOnInit(): Promise<any> {
    localStorage.removeItem('idoffre_recherche');
    await this.offreService.getOffres()
      .then(
        (res:any) => {
          this.offres=res.data;
          this.nombreOffre=this.offres?.length;
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
            this.postulerService.getNumbreOfPostulations()
            .then(
              (res:any)=>{
                this.nombreCandidat=res.data[0].NBRCANDIDAT;
              })
        }
      ).catch(
        (err:any) => {
          console.log(err);
        }
      )
  }

  supprimer(id:any){
    this.offreService.deleteOffre(id)
    .then(
      (res:any) => {
        console.log(res);
        this.offres=this.offres.filter((offres:any) =>offres.IDOFFRE!==id);
        this.nombreOffre--;
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
    this.postulerService.Postuler(post)
    .then(
      (res:any) => {
        console.log(res);
        this.postulations?.push(idoffre);
      }
    ).catch(
      (err:any) => {
        console.log(err);
      }
    )
  }
  goToCandidats(idoffre:any){
    localStorage.setItem('idoffre_recherche',idoffre);
    this.router.navigate(['candidat']);
  }


}
