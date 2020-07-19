import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifService } from '../../services/notif.service';
import { UserService } from '../../services/user.service';
import { UserData } from '../../models/user.data';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private fb:FormBuilder, 
  private user:UserService, private notif:NotifService) { }
  
  authType:string;
  signupForm:FormGroup;
  loginForm:FormGroup;
  admin:boolean;

  ngOnInit(): void {
    this.determineAuth();
  }

  determineAuth(): void {
    const type = this.route.snapshot.paramMap.get('type');
    const token = this.route.snapshot.paramMap.get('token');

    if(token) {
        this.authType = 'login';
        this.createSignupForm();
        this.createLoginForm();
        const data = { token:token }
        this.user.activate(data).subscribe((res:UserData) => {
            this.notif.success('Account activated successfully');
        })
        return;
    }

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

  signup(form:FormGroup): void {
    this.user.create(form.value, this.admin).subscribe((res:UserData) => {
        this.notif.success('Visit your email to complete the process');
       form.reset();
    })
  }

  login(form:FormGroup): void {
    this.user.authenticate(form.value).subscribe((res:UserData) => {
        localStorage.setItem('moto_user', JSON.stringify(res.data.user));
        localStorage.setItem('moto_token', res.data.token);
        this.router.navigate(['/dashboard']);
        this.notif.success('Logged in successfully');
    })
  }

  verifyEmail(): void {
    if(this.loginEmail.invalid) {
        this.notif.error('Enter a valid email');
        return;
    }

    const data = { email:this.loginEmail.value };
    this.user.verifyEmail(data).subscribe((res:any) => {
        this.loginForm.reset();
        this.notif.success('Check your email to complete the process');
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
