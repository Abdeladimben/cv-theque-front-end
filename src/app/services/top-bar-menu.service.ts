import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopBarMenuService {
  connected:any='';
  userType:any='';
  constructor() { }

  connection(){
    this.connected=localStorage.getItem('connected');
  }
  type(){
    this.userType=localStorage.getItem('type');
  }
}
