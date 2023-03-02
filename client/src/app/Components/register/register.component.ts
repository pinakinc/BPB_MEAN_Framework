import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.createForm()
  }
  createForm(){
    this.form = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(30),this.validateEmail])],
      username: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(15),this.validateUsername])],
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validatePassword // Custom validation
      ])],
      confirm: ['',Validators.required]
    },{validator: this.matchingPasswords('password','confirm')})
  }

  validateEmail(controls:any){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    if (regExp.test(controls.value)){
      return null;

    } else {
      return {'validateEmail':true}
    }

  }

  validateUsername(controls:any){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    
    if (regExp.test(controls.value)){
      return null;

    } else {
      return {'validateUsername':true}
    }

  }

  validatePassword(controls: any) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true } // Return as invalid password
    }
  }

  matchingPasswords(password: any,confirm: any){
    return (group: FormGroup)=>{
      if (group.controls[password].value === group.controls[confirm].value){
        return null;
      } else {
        return {'matchingPasswords':true}
      }
    }
  }
  onRegisterSubmit() {
    console.log('Form submitted');
  }
  ngOnInit(): void {
  }

}
