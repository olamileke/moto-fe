import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route } from '../../models/route';
import { RouteService } from '../../services/route.service';
import { NotifService } from '../../services/notif.service';
import { RouteData } from 'src/app/models/route.data';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']
})
export class EditRouteComponent implements OnInit {

  constructor(private fb:FormBuilder, private rte:RouteService, private notif:NotifService) { }
  
  @Input() route:Route;
  @Output() viewRoute = new EventEmitter();
  editForm:FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.editForm = this.fb.group({
        name:[this.route.name, [Validators.required, Validators.minLength(6)]],
        description:[this.route.description, [Validators.required, Validators.minLength(40)]]
    })
  }

  submit(form:FormGroup): void {
    this.rte.edit(form.value, this.route._id).subscribe((res:RouteData) => {
        this.view();
        this.notif.success('Route updated successfully');
    })
  }

  view(): void {
    this.viewRoute.emit();
  }

  get name(): any {
    return this.editForm.get('name');
  }

  get description(): any {
    return this.editForm.get('description');
  }

}
