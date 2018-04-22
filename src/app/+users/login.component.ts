import {
  Component,
  OnInit,
} from '@angular/core';
/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

import { AuthService } from './auth.service';
import { Router } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';


console.log('`login` component loaded asynchronously');

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'login',
  templateUrl: './login.component.html',

  styles:[`
  
.container {
  margin-top: 20px;
}
   
  .login {
     margin-top: 20px;
    flex-wrap: wrap;
    text-align: center;
     display: flex;
     justify-content: center;
     flex-direction: column;
   }
   div[fxLayoutAlign] { margin-top:10px;}
`]


})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  newUser: boolean = true; // to toggle login or signup form
  passReset: boolean = false;

  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
  };

constructor(private auth:AuthService, private route: Router, private fb: FormBuilder) {}


ngOnInit(): void {
  this.buildForm();
}
toggleForm(): void {
  this.newUser = !this.newUser;
}

signup(): void {
  this.auth.emailSignUp(this.loginForm.value['email'], this.loginForm.value['password'])
}

login(): void {
  this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password'])
  .then(() => this.afterLogIn())
}
resetPassword() {
  this.auth.resetPassword(this.loginForm.value['email'])
  .then(() => this.passReset = true)
}

buildForm() {
  this.loginForm = this.fb.group({
    'email': ['', [
      Validators.required,
      Validators.email,
    ]],
    'password': ['', [
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6),
      Validators.maxLength(25),
    ]],
  });

  this.loginForm.valueChanges.subscribe((data) => this.onValueChanged(data));
  this.onValueChanged(); // reset validation messages
}


// Updates validation state on form changes.
onValueChanged(data?: any) {
  if (!this.loginForm) { return; }
  const form = this.loginForm;
  for (const field in this.formErrors) {
    // clear previous error message (if any)
    this.formErrors[field] = '';
    const control = form.get(field);
    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        this.formErrors[field] += messages[key] + ' ';
      }
    }
  }
}



/** 
 login(formValues){
      this.authService.loginUser(formValues.userName, formValues.password );
      this.route.navigate(['eventos']);
  }
*/
  cancel(){
    this.route.navigate(['eventos']);
  }

  private afterLogIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.route.navigate(['user/profile']);
  }

}
