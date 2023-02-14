import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Offre } from 'src/app/core/models/offre';
import { OffreService } from 'src/app/core/services/offre.service';

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


  constructor(private fb: FormBuilder,private offreService:OffreService ,private snackBar:MatSnackBar) { }


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
      uuid: '',
      type: this.experienceForm.value.type,
      poste: this.experienceForm.value.poste,
      description_offre: this.experienceForm.value.description,
      competences: this.experienceForm.value.competence,
      lieu: this.experienceForm.value.lieu,
      salaire: this.experienceForm.value.salaire,
      contrat:this.experienceForm.value.contrat,
      dureeContrat: this.experienceForm.value.dureeContrat,
      dateOffre: new Date(),
      nombreCandidat:0
    }
    console.log({...this.experienceForm});
    this.offreService.createNewOffre(myOffre)
      .then(
        (res:any)=>{
          this.snackBar.open("Offre publiée avec succées","oK")
        }
      ).catch(
        (err:any)=>{
          console.log(err);
        }
      )
      this.experienceForm.reset(
        {
          type:'',
          poste:'',
          lieu:'',
          salaire:'',
          contrat:'',
          dureeContrat:'',
          description:'',
          competence:'',
        }
      );
  }

}
