import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {


  selectedValue: string='';

  myUser:User={
    uuid:'',
    email:'',
    password:'',
    type:''
  }

  constructor(private fb:FormBuilder,private router:Router,public userService: UserService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  createAccountForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })


  resetMyUser() {
    this.myUser={
      uuid:'',
      email:'',
      password:'',
      type:''
    }
}


  create(){

    this.myUser={
      uuid:'',
      email:this.createAccountForm.value.email,
      password:this.createAccountForm.value.password,  
      type:'ROLE_USER'
    }

    this.userService.createNewUser(this.myUser).then((res:any) =>{
      this.snackBar.open("successful", "ok",{duration: 5 * 1000});
      this.router.navigate(['/home/login']);
    }).catch((err)=>{
      console.log(err);
    })

  }

}
