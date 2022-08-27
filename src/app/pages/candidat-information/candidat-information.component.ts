import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Candidat } from 'src/app/interfaces/candidat';
import { CandidatService } from 'src/app/services/candidat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-candidat-information',
  templateUrl: './candidat-information.component.html',
  styleUrls: ['./candidat-information.component.css']
})
export class CandidatInformationComponent implements OnInit {

  

  myCandidat:Candidat={
    IDCANDIDAT:'',
    NOM:'',
    PRENOM:'',
    DATENAISSANCE:'',
    VILLE:'',
    NATIONALITE:'',
    ADRESSE:'',
    TELEPHONE:'',
    EMAIL:localStorage.getItem('email')+''
  }
  id:any='';
  exist:boolean =false;



  candidatForm=this.fb.group({
      name:['',Validators.required],
      prenom:['',Validators.required],
      datenaissance:['',Validators.required],
      ville:['',Validators.required],
      adresse:['',Validators.required],
      telephone:['',Validators.required]
    })

  constructor(private fb: FormBuilder,private snackBar:MatSnackBar,private router:Router ,public candidatService: CandidatService,public userService: UserService) {

   }

  ngOnInit(): void {
    console.log('start');
    this.candidatService.getCandidatWithEmail(localStorage.getItem('email')+'').then((res:any)=>{
      console.log('res');
      console.log(res);
      if(res.data==null || res.data==undefined){
        this.exist=false;
      }else{
        this.exist=true;
        this.myCandidat=res.data;
        
        console.log(this.myCandidat);
      }
    }).catch((err)=>{
      console.log(err);
    })

  }

  

  async next(){
    


      this.myCandidat={
        IDCANDIDAT:'',
        NOM:this.candidatForm.value.name,
        PRENOM:this.candidatForm.value.prenom,
        DATENAISSANCE:moment(this.candidatForm.value.datenaissance).format('YYYY/MM/DD'),
        VILLE:this.candidatForm.value.ville,
        NATIONALITE:'maroc',
        ADRESSE:this.candidatForm.value.adresse,
        TELEPHONE:this.candidatForm.value.telephone,
        EMAIL:localStorage.getItem('email')+''
      }
      await this.candidatService.createNewCandidat(this.myCandidat).then((res:any)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
      

      this.candidatService.getCandidatWithEmail(localStorage.getItem('email')+'').then((resultat:any)=>{
        console.log("getCandidatWithEmail");
        console.log(resultat);
        this.candidatService.myCandidat=resultat.data[0];
        this.candidatService.myCandidat.IDCANDIDAT=resultat.data[0].IDCANDIDAT;
        localStorage.setItem('idcandidat', resultat.data[0].IDCANDIDAT);
        this.router.navigate(['/accueil']);
      }).catch((err)=>{
        console.log(err);
      })
        



    
  }

}
