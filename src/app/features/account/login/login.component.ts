import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidatService } from 'src/app/core/services/candidat.service';
import { Candidat } from 'src/app/core/models/candidat';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myCandidat: Candidat = {
    uuid: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: '',
    adresse: '',
    email: '',
    telephone: '',
    description: '',

    centreInterets: [],
    experiences: [],
    formations: [],
    langues: [],
    specialites: [],
    intitule: ''
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public userService: UserService,
    public candidatService: CandidatService,
  ) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    const myUser: User = {
      uuid: '',
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      type: null,
    };

    this.userService.login(myUser).then((res: any) => {
      console.log('login');
      console.log(res);
      if (res.accessToken != null) {
        this.userService.setAccessToken(res.accessToken);
        this.userService.user = res.accountDTO;
        if (res.accountDTO.type == 'ROLE_USER') {
          this.candidatService
            .getCandidatByAccountToken()
            .then((result: any) => {
              if (result != null || result != undefined) {
                console.group();
                console.log('result');
                console.log(result);
                console.groupEnd();
                this.router.navigate(['/user/profil']);
              } else {
                console.log('this.userService.user');
                console.log(this.userService.user.type);
                this.router.navigate(['/user/candidatInformation']);
              }
            });
        } else if (res.accountDTO.type == 'ROLE_ADMIN') {
          this.router.navigate(['/admin/dashbord'], { relativeTo: this.route });
        }
        localStorage.setItem('type', this.userService.user.type);
        this.snackBar.open('Login successful', 'ok', { duration: 5 * 1000 });
      }
    });
  }
}
