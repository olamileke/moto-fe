import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '../../models/vehicle';
import { FileService } from '../../services/file.service';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleData } from 'src/app/models/vehicle.data';
import { NotifService } from '../../services/notif.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  constructor(private fb:FormBuilder, private file:FileService, private notif:NotifService,
  private vehicle_service:VehicleService) { }

  @Input() vehicle:Vehicle;
  @Output() viewVehicles = new EventEmitter();
  editForm:FormGroup;
  @ViewChild('fileInput') fileInput;
  @ViewChild('vehicleImage') vehicleImage;
  imageUploaded:boolean = false;
  vehicle_picture:File;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.editForm = this.fb.group({
        model:[this.vehicle.model, [Validators.required, Validators.minLength(6)]],
        plate_number:[this.vehicle.plate_number, [Validators.required, Validators.minLength(9)]]
    })
  }

  fileClick(): void {
    this.fileInput.nativeElement.click();
  }

  setImage(fileInput:any): void {
    const file = fileInput.files[0];

    if(this.file.validate(file)) {
        const reader = new FileReader();

        reader.onload = e => {
            this.imageUploaded = true;  
            this.vehicleImage.nativeElement.src = e.target.result;
            this.vehicle_picture = file;
        }

        reader.readAsDataURL(file);
    }
  }

  submit(form:FormGroup): void {
    const formData = new FormData();
    formData.append('model', form.get('model').value);
    formData.append('plate_number', form.get('plate_number').value);
    this.vehicle_picture ? formData.append('image', this.vehicle_picture) : '';

    this.vehicle_service.edit(this.vehicle._id, formData).subscribe((res:VehicleData) => {
        this.notif.success('Vehice updated successfully');
    })
  }

  view(): void {
    this.viewVehicles.emit();
  }

  get model(): any {
    return this.editForm.get('model');
  }

  get plate_number(): any {
    return this.editForm.get('plate_number');
  }

}
