import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private fb:FormBuilder) { }
  
  authType:string;
  signupForm:FormGroup;
  loginForm:FormGroup;
  admin:boolean;

  ngOnInit(): void {
    this.determineAuth();
  }

  determineAuth(): void {
    const type = this.route.snapshot.paramMap.get('type');

    if(type == 'signup' || type == 'login') {
        this.authType = type; 

        document.URL.includes('admin') ? this.admin = true : this.admin = false;

        this.createSignupForm();
        this.createLoginForm();
    }

  }

  createSignupForm(): void {
    this.signupForm = this.fb.group({
        name:['', [Validators.required, Validators.minLength(6)]],
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(8)]]
    })
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(8)]]
    })
  }

  switchAuth(authType:string): void {
    this.authType = authType;
  }

  get signupName(): any {
    return this.signupForm.get('name');
  }

  get signupEmail(): any {
    return this.signupForm.get('email');
  }

  get signupPassword(): any {
    return this.signupForm.get('password');
  }

  get loginEmail(): any {
    return this.loginForm.get('email');
  }
  
  get loginPassword(): any {
    return this.loginForm.get('password');
  }

}
