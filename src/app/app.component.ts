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

  currentRoute: string;

  constructor(private router: Router) {
    
    this.currentRoute = "";
    /*this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.type=localStorage.getItem('type');
            // Hide progress spinner or progress bar
            this.currentRoute = event.urlAfterRedirects;          
            console.log(event);
            console.log(this.currentRoute);
        }
    });*/
    this.type=localStorage.getItem('type');
}
  ngOnInit(): void {
    
    this.type=localStorage.getItem('type');
  }
  changeOfRoutes(){
    console.log('change route');
    this.type=localStorage.getItem('type');

  }


}
