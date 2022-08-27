import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Offre } from 'src/app/interfaces/offre';
import { OffreService } from 'src/app/services/offre/offre.service';

@Component({
  selector: 'app-publier',
  templateUrl: './publier.component.html',
  styleUrls: ['./publier.component.css']
})
export class PublierComponent implements OnInit {

  typeOffre:any[]=[
    {value:'emploie',viewValue:'Emploie'},
    {value:'stage',viewValue:'Stage'}
  ];
  typeContrat:any[]=[
    {value:'stage',viewValue:'STAGE'},
    {value:'cdi',viewValue:'CDI'},
    {value:'cdd',viewValue:'CDD'},
    {value:'anapec',viewValue:'ANAPEC'}
  ];


  constructor(private fb: FormBuilder,private offreService:OffreService) { }


  experienceForm=this.fb.group({
    type:['',Validators.required],
    poste:['',Validators.required],
    lieu:['',Validators.required],
    salaire:['',Validators.required],
    contrat:['',Validators.required],
    dureeContrat:['',Validators.required],
    description:['',Validators.required],
    competence:['',Validators.required],
  })


  ngOnInit(): void {
  }

  publier(){

    let myOffre:Offre={
      IDOFFRE: 0,
      TYPE: this.experienceForm.value.type,
      POSTE: this.experienceForm.value.poste,
      DESCRIPTION: this.experienceForm.value.description,
      COMPETENCES: this.experienceForm.value.competence,
      LIEU: this.experienceForm.value.lieu,
      SALAIRE: this.experienceForm.value.salaire,
      CONTRAT:this.experienceForm.value.contrat,
      DUREECONTRAT: this.experienceForm.value.dureeContrat,
      DATEOFFRE: new Date(),
      NBRCANDIDAT:0
    }
    this.offreService.createNewOffre(myOffre)
      .then(
        (res:any)=>{
          console.log(res);
          console.log("succées");
          this.experienceForm.controls['type'].setValue('');
          this.experienceForm.controls['poste'].setValue('');
          this.experienceForm.controls['description'].setValue('');
          this.experienceForm.controls['competence'].setValue('');
          this.experienceForm.controls['lieu'].setValue('');
          this.experienceForm.controls['salaire'].setValue('');
          this.experienceForm.controls['contrat'].setValue('');
          this.experienceForm.controls['dureeContrat'].setValue('');
        }
      ).catch(
        (err:any)=>{
          console.log(err);
        }
      )
  }


}
