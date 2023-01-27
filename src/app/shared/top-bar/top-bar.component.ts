import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';
import { CandidatService } from 'src/app/core/services/candidat.service';
import { DownloadCvService } from 'src/app/core/services/download-cv.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  connected:any=localStorage.getItem('connected');
  userType:any=localStorage.getItem('type');
  currentRoute: string="/";
  @Output() toggleSideBars: EventEmitter<any>= new EventEmitter();

  user:User|any;
  user2:User={};

  selectedFile:any;
  constructor(
              public userService:UserService,
              private snackBar: MatSnackBar,
              public candidatService: CandidatService,
              public downloadService: DownloadCvService,
              public dialog: MatDialog
            ) {}

  ngOnInit(): void {
    console.log("init top bar")
    if(this.userService.getAccessToken()!=null){
      console.log("getAccessToken top bar")
      this.userService.isLoggedIn().then((res:any)=>{
        console.log("isLoggedIn top bar")
        this.user=this.userService.UserValue;
        console.log(this.user)
      }).catch((err:any)=>{
        console.log(err);
      })
    }
  }

  logout(){
    this.userService.user={
      uuid:'',
      email:'',
      password:'',
      type:''
    };
    this.userService.logOut();
    this.user=null;
  }
  toggleSideBar(){
    this.toggleSideBars.emit();
  }

  openDialog(target_modal: any) {
    this.selectedFile = null;
    this.dialog.open(target_modal);
  }

  onFileSelected(event: any) {
    let a:string;
    this.selectedFile=null;
    console.log(event.target.files[0].type)
    if(event.target.files[0].type=="application/pdf"){
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile.name)
    }else{
      this.snackBar.open('Choisir un pdf', 'ok', { duration: 5 * 1000 });
    }
  }

  uploadCV() {
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile);
    this.downloadService.createCV(formData).then((res:any)=>{
      console.log(res)
      this.snackBar.open('Ajout CV avec succées', 'ok', { duration: 5 * 1000 });
    }).catch((err:any)=>{
      this.snackBar.open('Ajout CV failed', 'ok', { duration: 5 * 1000 });
      console.log(err)
    })

    this.selectedFile =null;
    
  }

  uploadLettre() {

    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile);
    this.downloadService.createLettre(formData).then((res:any)=>{
      console.log(res)
      this.snackBar.open('Ajout Lettre avec succées', 'ok', { duration: 5 * 1000 });
    }).catch((err:any)=>{
      this.snackBar.open('Ajout Lettre failed', 'ok', { duration: 5 * 1000 });
      console.log(err)
    })

    this.selectedFile =null;
    
  }


  
}
