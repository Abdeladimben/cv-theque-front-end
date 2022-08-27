import { Component, OnInit,HostListener  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  public getScreenWidth: any;
  public getScreenHeight: any;
  menu:any=false;
  navbar:any = true;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
      console.log('this.getScreenWidth');
      console.log(this.getScreenWidth);
      console.log('this.getScreenHeight');
      console.log(this.getScreenHeight);
  }

  changerComponent(c:string){
    switch (c) {
      case 'publier':
        this.router.navigate(['/publier']);
        break;
      case 'offres':
        this.router.navigate(['/offres']);
        break;
      case 'cvs':
        this.router.navigate(['/admin']);
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    console.log('this.getScreenWidth');
    console.log(this.getScreenWidth);
    console.log('this.getScreenHeight');
    console.log(this.getScreenHeight);
    if(this.getScreenWidth<=425){
      this.menu=true;
      this.navbar=false;
    }else{
      this.menu=false;
      this.navbar=true;
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
