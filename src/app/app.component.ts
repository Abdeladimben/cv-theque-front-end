import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cvtheque';
  type:any=localStorage.getItem('type');
  SideBarOpen=true;
  currentRoute: string;

  constructor(private router: Router) {
    
    this.currentRoute = "";
    this.type=localStorage.getItem('type');
}
  ngOnInit(): void {
    
    this.type=localStorage.getItem('type');
  }
  changeOfRoutes(){
    console.log('change route');
    this.type=localStorage.getItem('type');

  }

  sideBarToggler() {
    this.SideBarOpen= !this.SideBarOpen;
  }


}
