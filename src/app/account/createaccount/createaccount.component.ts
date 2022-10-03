import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    EMAIL:'',
    PASSWORD:'',
    TYPE:''
  }

  constructor(private fb:FormBuilder,private router:Router,public userService: UserService) { }

  ngOnInit(): void {
  }

  createAccountForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })


  resetMyUser() {
    this.myUser={
    EMAIL:'',
    PASSWORD:'',
    TYPE:''
  }
}


  create(){

    //var encryptedPassword = this.EncrDecr.set('123456$#@$^@1ERF', this.createAccountForm.value.password);
    //console.log(encryptedPassword);
    this.myUser={
      EMAIL:this.createAccountForm.value.email,
      PASSWORD:this.createAccountForm.value.password,  ///encryptedPassword
      TYPE:'utilisateur'
    }

    this.userService.createNewUser(this.myUser).then((res:any) =>{
      console.log(res);
      this.userService.user=res;
      localStorage.setItem('email', this.createAccountForm.value.email);
      localStorage.setItem('type','utilisateur');
      localStorage.setItem('connected', 'true');
      console.log('succées')

      this.router.navigate(['/candidatInformation']);


    }).catch((err)=>{
      console.log(err);
    })

  }

}
