import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteService } from '../../services/route.service';
import { NotifService } from '../../services/notif.service';
import { RouteData } from '../../models/route.data';

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.css']
})
export class NewRouteComponent implements OnInit {

  constructor(private route:RouteService, private notif:NotifService, private fb:FormBuilder) { }
  newForm:FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.newForm = this.fb.group({
        name:['', [Validators.required, Validators.minLength(6)]],
        description:['', [Validators.required, Validators.minLength(40)]]
    })
  }

  submit(form:FormGroup): void {
    this.route.create(form.value).subscribe((res:RouteData) => {
        this.notif.success('Route created successfully');
        form.reset();
    })
  }

  get name(): any {
    return this.newForm.get('name');
  }

  get description(): any {
    return this.newForm.get('description');
  }



}
