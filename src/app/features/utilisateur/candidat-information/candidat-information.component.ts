import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/core/models/candidat';
import { CandidatService } from 'src/app/core/services/candidat.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-candidat-information',
  templateUrl: './candidat-information.component.html',
  styleUrls: ['./candidat-information.component.css']
})
export class CandidatInformationComponent implements OnInit {



  myCandidat:Candidat={
    uuid: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: '',
    adresse: '',
    email: '',
    telephone: '',
    propos: '',

    centreInterets: [],
    experiences: [],
    formations: [],
    langues: [],
    specialites: [],
    intitule: ''
  }
  id:any='';
  exist:boolean =false;



  candidatForm=this.fb.group({
      name:['',Validators.required],
      prenom:['',Validators.required],
      intitule:['',Validators.required],
      datenaissance:['',Validators.required],
      lieunaissance:['',Validators.required],
      adresse:['',Validators.required],
      telephone:['',Validators.required],
      description:['']
    })

  constructor(private fb: FormBuilder,private snackBar:MatSnackBar,private router:Router ,public candidatService: CandidatService,public userService: UserService) {

  }

  ngOnInit(): void {
  }



  next(){

      this.myCandidat={
        uuid:'',
        nom:this.candidatForm.value.name,
        prenom:this.candidatForm.value.prenom,
        intitule:this.candidatForm.value.intitule,
        dateNaissance:this.candidatForm.value.datenaissance,
        lieuNaissance:this.candidatForm.value.lieunaissance,
        nationalite:'maroc',
        adresse:this.candidatForm.value.adresse,
        telephone:this.candidatForm.value.telephone,
        propos:this.candidatForm.value.description,
        
        centreInterets:[],
        experiences:[],
        formations:[],
        langues:[],
        specialites:[],
      }
      this.candidatService.createNewCandidat(this.myCandidat).then((res:any)=>{
        console.log(res);
          this.router.navigate(['/user/profil']);
      }).catch((err)=>{
        console.log(err);
      })


  }

}
