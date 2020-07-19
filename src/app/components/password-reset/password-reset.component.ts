import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotifService } from '../../services/notif.service'; 
import { UserData } from '../../models/user.data';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private router:Router, private rte:ActivatedRoute, private fb:FormBuilder, private notif:NotifService,
  private user:UserService) { }

  ngOnInit(): void {
    this.determineTokenValidity();
  }

  token:string;
  resetForm:FormGroup;

  determineTokenValidity(): void {
    this.token = this.rte.snapshot.paramMap.get('token');
    const data = { token:this.token };
    this.user.verifyResetToken(data).subscribe((res:any) => {
        this.createForm();
    })
  }

  createForm(): void {
    this.resetForm = this.fb.group({
        password:['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get password(): any {
    return this.resetForm.get('password');
  }

  reset(form:FormGroup): void {
    const data = { ...form.value, token:this.token }
    this.user.resetPassword(data).subscribe((res:UserData) => {
        this.notif.success('Password changed successfully');
        this.router.navigate(['/auth/login']);
    })
  }
}
