import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.css']
})
export class ErrorFormComponent implements OnInit {


  
  @Input("control") controlError: any;
  errors: any = {
    required: "Required",
    pattern: "Format invalid",
    minlength: "S'il vous plait numero Compte doit avoir 24",
    maxlength: "S'il vous plait numero Compte doit avoir 24",
    email: "S'il vous plait entrer un email validé"
  }

  constructor() { }

  ngOnInit(): void {
  }

  getError() {
    
    return this.controlError?.errors != null ? this.errors[Object.keys(this.controlError.errors)[0]] : null ;
    
  }
    

}
