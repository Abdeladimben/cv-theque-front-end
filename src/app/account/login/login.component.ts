import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { FormationService } from 'src/app/services/formation.service';
import { SpecialiteService } from 'src/app/services/specialite.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { Formation } from 'src/app/interfaces/formation';
import { Experience } from 'src/app/interfaces/experience';
import { Specialite } from 'src/app/interfaces/specialite';
import { Candidat } from 'src/app/interfaces/candidat';
import { TopBarComponent } from 'src/app/components/top-bar/top-bar.component';
import { User } from 'src/app/interfaces/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  myCandidat:Candidat={
    IDCANDIDAT:'',
    NOM:'',
    PRENOM:'',
    DATENAISSANCE:'',
    LIEUNAISSANCE:'',
    NATIONALITE:'',
    ADRESSE:'',
    TELEPHONE:'',
    EMAIL:localStorage.getItem('email')+''
  }

  myFormation:Formation={
    IDFORMATION:'',
    DIPLOME:'',
    INSTITUT:'',
    ANNEESCOLAIRE:'',
    MENTION:'',
    IDCANDIDAT:localStorage.getItem('idcandidat')+'',
  }

  myExperience:Experience={
    IDEXPERIENCE:'',
    TYPE:'',
    DATEDEBUT:'',
    ENTREPRISE:'',
    DEPARTEMENTSERVICE:'',
    IDCANDIDAT:localStorage.getItem('idcandidat')+''
  }

  mySpecialite:Specialite={
    IDSPECIALITE:'',
    INTITULE:'',
    IDCANDIDAT:localStorage.getItem('idcandidat')+''
  }


  constructor(private fb:FormBuilder,private router:Router,private route: ActivatedRoute,private snackBar:MatSnackBar,public userService: UserService,public candidatService: CandidatService,public formationService:FormationService,public specialiteService:SpecialiteService,public experienceService:ExperienceService) { }

  ngOnInit(): void {

  }

  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })


  login(){
    //let encryptedPassword= this.EncrDecr.set('123456$#@$^@1ERF', this.loginForm.value.password);
    const myUser:User={
      EMAIL:this.loginForm.value.email,
      PASSWORD:this.loginForm.value.password,  ///encryptedPassword
      TYPE:'utilisateur'
    }
    /*this.userService.getUsers(myUser).then((res:any)=>{
      console.log(res);
      if(res.length==0){
        console.log("Account does not exist");
        this.snackBar.open("Account does not exist","ok",{duration: 10 * 1000});
      }else if(res.data[0].PASSWORD!=this.loginForm.value.password){ //encryptedPassword
        console.log("Password invalid");
        this.snackBar.open("Password invalid","ok",{duration: 10 * 1000});
      }else{
        console.log("matched");
        this.userService.user=res.data[0];
        localStorage.setItem('email', this.userService.user.EMAIL);
        localStorage.setItem('type',this.userService.user.TYPE);
        localStorage.setItem('connected', 'true');
        this.snackBar.open("Login successful", "ok",{duration: 5 * 1000});
        if (this.userService.user.TYPE=='utilisateur'){
          this.candidatService.getCandidatWithEmail(this.userService.user.EMAIL).then((res:any)=>{
            if (res.data!=null || res.data!=undefined){
              this.myCandidat=res.data[0];
              localStorage.setItem('idcandidat', this.myCandidat.IDCANDIDAT);
              this.router.navigate(['/accueil']);
            }else{
              this.router.navigate(['/candidatInformation']);
            }
          }).catch((err)=>{
            console.log(err);
          })

        }else{
          this.router.navigate(['/admin'], {relativeTo: this.route});
        }
      }
    }).catch((err)=>{
      console.log(err);
    });*/

    this.userService.getUsers(myUser).then((res:any)=>{
      console.log(res);
      if(res.email){

        if(res.password){
          console.log("matched");
          this.userService.user=res.data[0];

          if (this.userService.user.TYPE=='utilisateur'){
            this.candidatService.getCandidatWithEmail(this.userService.user.EMAIL).then((res:any)=>{
              if (res.data!=null || res.data!=undefined){
                this.myCandidat=res.data[0];
                localStorage.setItem('idcandidat', this.myCandidat.IDCANDIDAT);
                this.router.navigate(['/accueil']);
              }else{
                this.router.navigate(['/candidatInformation']);
              }
            }).catch((err)=>{
              console.log(err);
            })

          }else{
            this.router.navigate(['/admin'], {relativeTo: this.route});
          }

        }else{
          console.log("Password invalid");
          this.snackBar.open("Password invalid","ok",{duration: 10 * 1000});
        }
      }else{ //encryptedPassword
        console.log("Account does not exist");
        this.snackBar.open("Account does not exist","ok",{duration: 10 * 1000});
      }
    }).catch((err)=>{
      console.log(err);
    });


  }

}
