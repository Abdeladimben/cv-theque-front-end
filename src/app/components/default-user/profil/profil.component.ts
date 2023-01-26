import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Candidat } from 'src/app/interfaces/candidat';
import { CentreInteret } from 'src/app/interfaces/centre-interet';
import { Experience } from 'src/app/interfaces/experience';
import { Formation } from 'src/app/interfaces/formation';

import { Specialite } from 'src/app/interfaces/specialite';
import { CandidatService } from 'src/app/services/candidat.service';
import { UserService } from 'src/app/services/user.service';
import { Langue } from 'src/app/interfaces/langue';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DownloadCvService } from 'src/app/services/download-cv.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit, OnChanges {
  idCandidat: any = '';

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

  finalCandidat: Candidat = {
    uuid: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: '',
    adresse: '',
    telephone: '',
    email: '',
    description: '',

    centreInterets: [],
    experiences: [],
    formations: [],
    langues: [],
    specialites: [],
    intitule: ''
  };

  myFormation: Formation = {
    uuid: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    diplome: '',
    institut: '',
    mention: '',
    niveau: '',
  };

  myExperience: Experience = {
    uuid: '',
    role: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    entreprise: '',
    description: '',
  };

  mySpecialite: Specialite = {
    uuid: '',
    intitule: '',
  };

  myLangue: Langue = {
    uuid: '',
    nom: '',
    niveau: '',
  };

  myCentreInteret: CentreInteret = {
    uuid: '',
    intitule: '',
  };

  formation: any[] = [];
  experience: any[] = [];
  specialite: any[] = [];
  langue: any[] = [];
  centreInteret: any[] = [];

  selectLangues: string[] = ['ARABE', 'FRANÇAIS', 'ENGLAIS'];
  selectLangueNiveau:string[] = ['BIEN','MOYEN','FAIBLE']
  selectedFile: any;

  showUpdateButton: boolean = false;
  showAddButton: boolean = false;
  checkEnregistrer: boolean = false;

  indexForUpdate: any;

  dialogTitle:any;

  cvExist:any;
  lettreExist:any;
  constructor(
    public candidatService: CandidatService,
    public userService: UserService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public downloadCvService:DownloadCvService,
    private datePipe: DatePipe
  ) {}

  formationForm = this.fb.group({
    diplome: ['', Validators.required],
    institut: ['', Validators.required],
    mention: ['', Validators.required],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    niveau: ['', Validators.required],
  });

  informationPersonnelleForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    telephone: ['', Validators.required],
    email: ['', Validators.required],
    dateNaissance: ['', Validators.required],
    lieuNaissance: ['', Validators.required],
    nationalite: ['', Validators.required],
    adresse: ['', Validators.required],
    description: [''],
  });

  experienceForm = this.fb.group({
    role: ['', Validators.required],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    entreprise: ['', Validators.required],
    description: ['', Validators.required],
  });

  specialiteForm = this.fb.group({
    specialite: ['', Validators.required],
  });

  langueForm = this.fb.group({
    nom: ['', Validators.required],
    niveau: ['', Validators.required],
  });

  centreInteretForm = this.fb.group({
    centreInteret: ['', Validators.required],
  });

  @Input('candidat') uuid_candidat: any;
  showIcon: boolean = true;

  ngOnChanges() {
    console.log(this.uuid_candidat);
    if (this.uuid_candidat != null) {
      this.candidatService.getCandidat(this.uuid_candidat).then((res: any) => {
        this.showIcon = false;
        this.myCandidat = res;
        console.log(res);
      });
    }
  }

  ngOnInit() {
    if (this.uuid_candidat == null) {
      this.reset();
    }
  }
  reset() {
    if (localStorage.getItem('accesstoken') != null) {
      this.candidatService
        .getCandidatByAccountToken()
        .then((res: any) => {
          this.myCandidat = this.finalCandidat = res;
          this.showIcon = true;
          this.checkEnregistrer = false;
          this.cvExist
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  update(choix: any, i: any) {
    switch (choix) {
      case 'information personnelle':
        this.myCandidat.nom = this.informationPersonnelleForm.value.nom;
        this.myCandidat.prenom = this.informationPersonnelleForm.value.prenom;
        this.myCandidat.telephone =
          this.informationPersonnelleForm.value.telephone;
        this.myCandidat.email = this.informationPersonnelleForm.value.email;
        this.myCandidat.dateNaissance =
          this.informationPersonnelleForm.value.dateNaissance;
        this.myCandidat.lieuNaissance =
          this.informationPersonnelleForm.value.lieuNaissance;
        this.myCandidat.nationalite =
          this.informationPersonnelleForm.value.nationalite;
        this.myCandidat.adresse = this.informationPersonnelleForm.value.adresse;
        this.myCandidat.description =
          this.informationPersonnelleForm.value.description;
        break;
      case 'formation':
        this.myFormation = {
          uuid: '',
          diplome: this.formationForm.value.diplome,
          institut: this.formationForm.value.institut,
          mention: this.formationForm.value.mention,
          dateDebut: this.formationForm.value.dateDebut,
          dateFin: this.formationForm.value.dateFin,
          niveau: this.formationForm.value.niveau,
        };

        this.myCandidat.formations[this.indexForUpdate] = this.myFormation;

        break;

      case 'experience':
        this.myExperience = {
          uuid: '',
          role: this.experienceForm.value.role,
          dateDebut: this.experienceForm.value.dateDebut,
          dateFin: this.experienceForm.value.dateFin,
          entreprise: this.experienceForm.value.entreprise,
          description: this.experienceForm.value.description,
        };
        this.myCandidat.experiences[this.indexForUpdate] = this.myExperience;
        break;

      case 'specialite':
        this.mySpecialite = {
          uuid: '',
          intitule: this.specialiteForm.value.specialite,
        };

        this.myCandidat.specialites[this.indexForUpdate] = this.mySpecialite;
        break;

      case 'langue':
        this.myLangue = {
          uuid: '',
          nom: this.langueForm.value.nom,
          niveau: this.langueForm.value.niveau,
        };

        this.myCandidat.langues[this.indexForUpdate] = this.myLangue;
        break;

      case 'centre':
        this.myCentreInteret = {
          uuid: '',
          intitule: this.centreInteretForm.value.centreInteret,
        };
        this.myCandidat.centreInterets[this.indexForUpdate] =
          this.myCentreInteret;
        break;
    }
    if (JSON.stringify(this.myCandidat) == JSON.stringify(this.finalCandidat)) {
      this.checkEnregistrer = true;
    } else {
      this.checkEnregistrer = false;
    }
    this.dialog.closeAll();
    this.snackBar.open('Update avec succées', 'ok', { duration: 5 * 1000 });
  }

  delete(choix: any, uuid: string) {
    switch (choix) {
      case 'formation':
        if (this.myCandidat.formations.length == 1) {
          this.myCandidat.formations = [];
        } else {
          let i = 0;
          this.myCandidat.formations.forEach((element, index) => {
            if (element.uuid == uuid) {
              i = index;
            }
          });
          this.myCandidat.formations.splice(i, 1);
        }
        break;

      case 'experience':
        if (this.myCandidat.experiences.length == 1) {
          this.myCandidat.experiences = [];
        } else {
          let i = 0;
          this.myCandidat.experiences.forEach((element, index) => {
            if (element.uuid == uuid) {
              i = index;
            }
          });
          this.myCandidat.experiences.splice(i, 1);
        }
        break;

      case 'specialite':
        if (this.myCandidat.specialites.length == 1) {
          this.myCandidat.specialites = [];
        } else {
          let i = 0;
          this.myCandidat.specialites.forEach((element, index) => {
            if (element.uuid == uuid) {
              i = index;
            }
          });
          this.myCandidat.specialites.splice(i, 1);
        }
        break;

      case 'langue':
        if (this.myCandidat.langues.length == 1) {
          this.myCandidat.langues = [];
        } else {
          let i = 0;
          this.myCandidat.langues.forEach((element, index) => {
            if (element.uuid == uuid) {
              i = index;
            }
          });
          this.myCandidat.langues.splice(i, 1);
        }

        break;

      case 'centre':
        if (this.myCandidat.centreInterets.length == 1) {
          this.myCandidat.centreInterets = [];
        } else {
          let i = 0;
          this.myCandidat.centreInterets.forEach((element, index) => {
            if (element.uuid == uuid) {
              i = index;
            }
          });
          this.myCandidat.centreInterets.splice(i, 1);
        }
        break;
    }
    if (JSON.stringify(this.myCandidat) == JSON.stringify(this.finalCandidat)) {
      this.checkEnregistrer = true;
    } else {
      this.checkEnregistrer = false;
    }
  }

  ajouter(choix: any) {
    switch (choix) {
      case 'formation':
        this.myFormation = {
          uuid: '',
          diplome: this.formationForm.value.diplome,
          institut: this.formationForm.value.institut,
          mention: this.formationForm.value.mention,
          dateDebut:this.datePipe.transform(this.formationForm.value.dateDebut,"yyyy-MM-dd"),
          dateFin:this.datePipe.transform(this.formationForm.value.dateFin,"yyyy-MM-dd"),
          niveau: this.formationForm.value.niveau,
        };
        if (this.myCandidat.formations == undefined) {
          this.myCandidat.formations = [this.myFormation];
        } else {
          this.myCandidat.formations = [
            this.myFormation,
            ...this.myCandidat.formations,
          ];
        }

        break;

      case 'experience':
        this.myExperience = {
          uuid: '',
          role: this.experienceForm.value.role,
          dateDebut:this.datePipe.transform( this.experienceForm.value.dateDebut,"yyyy-MM-dd")?.toString(),
          dateFin:this.datePipe.transform(this.experienceForm.value.dateFin,"yyyy-MM-dd")?.toString() ,
          entreprise: this.experienceForm.value.entreprise,
          description: this.experienceForm.value.description,
        };
        if (this.myCandidat.experiences == undefined) {
          this.myCandidat.experiences = [this.myExperience];
        } else {
          this.myCandidat.experiences = [
            this.myExperience,
            ...this.myCandidat.experiences,
          ];
        }
        break;

      case 'specialite':
        this.mySpecialite = {
          uuid: '',
          intitule: this.specialiteForm.value.specialite,
        };

        if (this.myCandidat.specialites == undefined) {
          this.myCandidat.specialites = [this.mySpecialite];
        } else {
          this.myCandidat.specialites = [
            this.mySpecialite,
            ...this.myCandidat.specialites,
          ];
        }
        break;

      case 'langue':
        this.myLangue = {
          uuid: '',
          nom: this.langueForm.value.nom,
          niveau: this.langueForm.value.niveau,
        };

        if (this.myCandidat.langues == undefined) {
          this.myCandidat.langues = [this.myLangue];
        } else {
          this.myCandidat.langues = [this.myLangue, ...this.myCandidat.langues];
        }
        break;

      case 'centre':
        this.myCentreInteret = {
          uuid: '',
          intitule: this.centreInteretForm.value.centreInteret,
        };

        if (this.myCandidat.centreInterets == undefined) {
          this.myCandidat.centreInterets = [this.myCentreInteret];
        } else {
          this.myCandidat.centreInterets = [
            this.myCentreInteret,
            ...this.myCandidat.centreInterets,
          ];
        }
        break;
    }
    if (JSON.stringify(this.myCandidat) == JSON.stringify(this.finalCandidat)) {
      this.checkEnregistrer = true;
    } else {
      this.checkEnregistrer = false;
    }
    this.dialog.closeAll();
    this.snackBar.open('Ajout avec succées', 'ok', { duration: 5 * 1000 });
  }

  enregistrer() {
    this.candidatService
      .updateCandidat(this.myCandidat)
      .then((res: any) => {
        this.checkEnregistrer = false;
        this.snackBar.open('Enregistrer avec succées', 'ok', {
          duration: 5 * 1000,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }



  remplirForm(form: any, formtype: any) {
    if (formtype == 'formation') {
      this.formationForm.patchValue({
        diplome: form.diplome,
        institut: form.institut,
        mention: form.mention,
        dateDebut: form.dateDebut,
        dateFin: form.dateFin,
        niveau: form.niveau,
      });
    } else if (formtype == 'experience') {
      this.experienceForm.patchValue({
        role: form.role,
        dateDebut: form.dateDebut,
        dateFin: form.dateFin,
        entreprise: form.entreprise,
        description: form.description,
      });
    } else if (formtype == 'specialite') {
      this.specialiteForm.patchValue({
        specialite: form.intitule,
      });
    } else if (formtype == 'langue') {
      this.langueForm.patchValue({
        nom: form.nom,
        niveau: form.niveau,
      });
    } else if (formtype == 'centre') {
      this.centreInteretForm.patchValue({
        centreInteret: form.intitule,
      });
    } else if (formtype == 'informationPersonnelle') {
      this.informationPersonnelleForm.patchValue({
        nom: this.myCandidat.nom,
        prenom: this.myCandidat.prenom,
        telephone: this.myCandidat.telephone,
        email: this.myCandidat.email,
        dateNaissance: this.myCandidat.dateNaissance,
        lieuNaissance: this.myCandidat.lieuNaissance,
        nationalite: this.myCandidat.nationalite,
        adresse: this.myCandidat.adresse,
        description: this.myCandidat.description,
      });
    }
  }

  openDialog(
    target_modal: any,
    form: any,
    type: any,
    formtype: any,
    index: any
  ) {
    console.log(form)
    if (type == 'update') {
      this.dialogTitle="MODIFIER"
      this.indexForUpdate = index;
      this.showAddButton = false;
      this.showUpdateButton = true;
      this.remplirForm(form, formtype);
      this.dialog.open(target_modal);
    } else {
      this.dialogTitle="AJOUTER"
      this.showUpdateButton = false;
      this.showAddButton = true;
      this.formationForm.reset();
      this.experienceForm.reset();
      this.specialiteForm.reset();
      this.langueForm.reset();
      this.centreInteretForm.reset();
      this.dialog.open(target_modal);
    }
  }




  telechargerCV(){
    this.downloadCvService.getFileCV().then((res:any)=>{
      this.downloadCvService.downloadFile(res.body,"CV_" +this.myCandidat.nom+"_"+this.myCandidat.prenom.toUpperCase());
    }).catch((err:any)=>{
      console.log(err)
    })
  }

  telechargerLettre(){
    this.downloadCvService.getFileLetrre().then((res:any)=>{
      this.downloadCvService.downloadFile(res.body,"Lettre_" +this.myCandidat.nom+"_"+this.myCandidat.prenom.toUpperCase());
    }).catch((err:any)=>{
      console.log(err)
    })
  }


}
