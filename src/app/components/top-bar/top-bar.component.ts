import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  connected:any=localStorage.getItem('connected');
  userType:any=localStorage.getItem('type');
  currentRoute: string="/";

  constructor(public userService:UserService,private router:Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.userType=localStorage.getItem('type');
          // Hide progress spinner or progress bar
          this.currentRoute = event.urlAfterRedirects;          
          console.log(event);
          console.log(this.currentRoute);
          console.log(this.userType);
      }
    });
   }

  ngOnInit(): void {
  }

  logout(){
    this.userService.user={
      EMAIL:'',
      PASSWORD:'',
      TYPE:''
    };
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  
}
