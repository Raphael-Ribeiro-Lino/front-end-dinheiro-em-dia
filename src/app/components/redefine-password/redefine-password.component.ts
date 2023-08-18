import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-redefine-password',
  templateUrl: './redefine-password.component.html',
  styleUrls: ['./redefine-password.component.css']
})
export class RedefinePasswordComponent implements OnInit{
  
  
  constructor(private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
  }

  submitForm() {
    
  }

}
