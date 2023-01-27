import { Component, OnInit,HostListener  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  menu:any=false;
  navbar:any = true;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  changerComponent(c:string){
    switch (c) {
      case 'publier':
        this.router.navigate(['/admin/publier']);
        break;
      case 'offres':
        this.router.navigate(['/admin/offres']);
        break;
      case 'cvs':
        this.router.navigate(['/admin/dashbord']);
        break;
    }
  }

  openMenu(){
    this.menu=false;
    this.navbar=true;
  }
  closeMenu(){
    this.menu=true;
    this.navbar=false;
  }


}
