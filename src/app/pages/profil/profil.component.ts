import { Component, OnInit } from '@angular/core';
import { Candidat } from 'src/app/interfaces/candidat';
import { CentreInteret } from 'src/app/interfaces/centre-interet';
import { Experience } from 'src/app/interfaces/experience';
import { Formation } from 'src/app/interfaces/formation';

import { Specialite } from 'src/app/interfaces/specialite';
import { CandidatService } from 'src/app/services/candidat.service';
import { CentreInteretService } from 'src/app/services/centre-interet.service';
import { CvService } from 'src/app/services/cv.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { FormationService } from 'src/app/services/formation.service';
import { LangueService } from 'src/app/services/langue.service';
import { SpecialiteService } from 'src/app/services/specialite.service';
import { UserService } from 'src/app/services/user.service';
import { Langue } from 'src/app/interfaces/langue';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  idCandidat: any ='';

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
  formation:any[]=[];
  experience:any[]=[];
  specialite:any[]=[];
  langue:any[]=[];
  centreInteret:any[]=[];

  showAddFormation:boolean=false;
  showAddExperience:boolean=false;
  showAddSpecialite:boolean=false;
  showAddLangue:boolean=false;
  showAddCentreInteret:boolean=false;



  constructor(public candidatService: CandidatService,public userService: UserService,public centreInteretService:CentreInteretService,public experienceService:ExperienceService,public formationService:FormationService,public langueService:LangueService,private fb: FormBuilder,public specialiteService:SpecialiteService) { }

  formationForm=this.fb.group({
    diplome:['',Validators.required],
    institut:['',Validators.required],
    anneescolaire:['',Validators.required],
    mention:['',Validators.required],
  })

  experienceForm=this.fb.group({
    type:['',Validators.required],
    datedebut:['',Validators.required],
    entreprise:['',Validators.required],
    departementservice:['',Validators.required]
  })

  specialiteForm=this.fb.group({
    specialite:['',Validators.required]
  })

  langueForm=this.fb.group({
    nom:['',Validators.required],
    niveau:['',Validators.required],
  })

  centreInteretForm=this.fb.group({
    centreinteret:['',Validators.required]
  })




  async ngOnInit(): Promise<void> {
    if(localStorage.getItem('idcandidat')!=null || localStorage.getItem('idcandidat')!=undefined){
      await this.candidatService.getCandidatWithEmail(localStorage.getItem('email')+'').then((res:any)=>{
        this.myCandidat=res.data[0];
        this.myCandidat.DATENAISSANCE=this.myCandidat.DATENAISSANCE.slice(0,10);
      })

      this.formationService.getFormationWithCandidat(localStorage.getItem('idcandidat')+'').then((res:any)=>{
        this.formation=res.data;
      })

      this.experienceService.getExperienceWithCandidat(localStorage.getItem('idcandidat')+'').then((res:any)=>{
        this.experience=res.data;
        this.experience?.forEach((element:any,i:number)=>{
          element.DATEDEBUT=element.DATEDEBUT.slice(0,10);
          console.log(i)
        })
        console.log(this.experience?.length)
      })

      this.specialiteService.getSpecialiteWithCandidat(localStorage.getItem('idcandidat')+'').then((res:any)=>{
        this.specialite=res.data;
      })

      this.langueService.getLangueWithCandidat(localStorage.getItem('idcandidat')+'').then((res:any)=>{
        this.langue=res.data;
      })

      this.centreInteretService.getCentreInteretWithCandidat(localStorage.getItem('idcandidat')+'').then((res:any)=>{
        this.centreInteret=res.data;
      })

    }


  }

  showAddForm(choix:any){
    switch (choix) {
      case 'formation':
        this.showAddFormation=!this.showAddFormation;
        break;

      case 'experience':
        this.showAddExperience=!this.showAddExperience;
        break;

      case 'specilite':
        this.showAddSpecialite=!this.showAddSpecialite;
        break;

      case 'langue':
        this.showAddLangue=!this.showAddLangue;
        break;

      case 'centre':
        this.showAddCentreInteret=!this.showAddCentreInteret;
        break;
    }
  }



  save(choix:any){
    switch (choix) {
      case 'formation':
        this.myFormation={
          IDFORMATION:'',
          DIPLOME:this.formationForm.value.diplome,
          INSTITUT:this.formationForm.value.institut,
          ANNEESCOLAIRE:this.formationForm.value.anneescolaire,
          MENTION:this.formationForm.value.mention,
          IDCANDIDAT:localStorage.getItem('idcandidat')+'',
        };

        this.formationService.createNewFormation(this.myFormation).
          then((res:any)=>{
            if(this.formation==undefined){
              this.formation=[this.myFormation];
            }else{
              this.formation.push(this.myFormation);
            }

            console.log(res);
            this.formationForm.controls['diplome'].setValue('');
            this.formationForm.controls['institut'].setValue('');
            this.formationForm.controls['anneescolaire'].setValue('');
            this.formationForm.controls['mention'].setValue('');
            this.showAddFormation=!this.showAddFormation;
          }).catch((err:any)=>{
            console.log(err);
          })
        break;

      case 'experience':
        this.myExperience={
          IDEXPERIENCE:'',
          TYPE:this.experienceForm.value.type,
          DATEDEBUT:this.experienceForm.value.datedebut,
          ENTREPRISE:this.experienceForm.value.entreprise,
          DEPARTEMENTSERVICE:this.experienceForm.value.departementservice,
          IDCANDIDAT:localStorage.getItem('idcandidat')+''
        }
        console.log(this.myExperience)
        this.experienceService.createNewExperience(this.myExperience)
          .then((res:any)=>{
            if(this.experience==undefined){
              this.experience=[this.myExperience];
            }else{
              this.experience.push(this.myExperience);
            }
            console.log(res);
            this.experienceForm.controls['type'].setValue('');
            this.experienceForm.controls['datedebut'].setValue('');
            this.experienceForm.controls['entreprise'].setValue('');
            this.experienceForm.controls['departementservice'].setValue('');
            this.showAddExperience=!this.showAddExperience;
          }).catch((err:any)=>{
            console.log(err);
          })

        break;

      case 'specilite':
        this.mySpecialite={
          IDSPECIALITE:'',
          INTITULE:this.specialiteForm.value.specialite,
          IDCANDIDAT:localStorage.getItem('idcandidat')+''
        }
        this.specialiteService.createNewSpecialite(this.mySpecialite).
          then((res:any)=>{
            if(this.specialite==undefined){
              this.specialite=[this.mySpecialite];
            }else{
              this.specialite.push(this.mySpecialite);
            }

            console.log(res);
            this.specialiteForm.controls['specialite'].setValue('');
            this.showAddSpecialite=!this.showAddSpecialite;
          }).catch((err)=>{
            console.log(err);
          })
        break;

      case 'langue':
        this.myLangue={
          IDLANGUE:'',
          NOM:this.langueForm.value.nom,
          NIVEAU:this.langueForm.value.niveau,
          IDCANDIDAT:localStorage.getItem('idcandidat')+''
        }
        this.langueService.createNewLangue(this.myLangue).
          then((res:any)=>{
            if(this.langue==undefined){
              this.langue=[this.myLangue];
            }else{
              this.langue.push(this.myLangue);
            }

            console.log(res);
            this.langueForm.controls['nom'].setValue('');
            this.langueForm.controls['niveau'].setValue('');
            this.showAddLangue=!this.showAddLangue;
          }).catch((err:any)=>{
            console.log(err);
          })
        break;

      case 'centre':
        this.myCentreInteret={
          IDCENTREINTERET:'',
          INTITULE:this.centreInteretForm.value.centreinteret,
          IDCANDIDAT:localStorage.getItem('idcandidat')+''
        }
        this.centreInteretService.createNewCentreInteret(this.myCentreInteret).
          then((res:any)=>{
            if(this.centreInteret==undefined){
              this.centreInteret=[this.myCentreInteret];
            }else{
              this.centreInteret.push(this.myCentreInteret);
            }
            console.log(res);
            this.centreInteretForm.controls['centreinteret'].setValue('');
            this.showAddCentreInteret=!this.showAddCentreInteret;
          }).catch((err:any)=>{
            console.log(err);
          })
        break;
    }
  }



}
