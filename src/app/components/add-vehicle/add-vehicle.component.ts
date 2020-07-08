import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotifService } from '../../services/notif.service';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleData } from '../../models/vehicle.data';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  constructor(private fb:FormBuilder, private notif:NotifService, private vehicle:VehicleService) { }

  addForm:FormGroup;
  @ViewChild('fileInput') fileInput;
  @ViewChild('vehicleImage') vehicleImage;
  imageUploaded:boolean = false;

  vehicle_picture:File;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.addForm = this.fb.group({
        model:['', [Validators.required, Validators.minLength(6)]],
        plate_number:['', [Validators.required, Validators.minLength(7)]]
    })
  }

  fileClick(): void {
    this.fileInput.nativeElement.click();
  }

  submit(form:FormGroup) {
    const formData = new FormData();
    formData.append('model', form.get('model').value);
    formData.append('image', this.vehicle_picture);
    formData.append('plate_number', form.get('plate_number').value);

    this.vehicle.create(formData).subscribe((res:VehicleData) => {
        this.notif.success('Vehicle added successfully');
    })
  }

  setImage(fileInput:any): void {
    const file = fileInput.files[0];

    if(this.validateFile(file)) {
        const reader = new FileReader();

        reader.onload = e => {
            this.imageUploaded = true;  
            this.vehicleImage.nativeElement.src = e.target.result;
            this.vehicle_picture = file;
        }

        reader.readAsDataURL(file);
    }
  }

  validateFile(file:File): boolean {
    const type = file.type.toLowerCase();
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if(!allowedTypes.includes(type)) {
        this.notif.error('file format not supported!');
        return false;
    }

    if(file.size > 6000000) {
        this.notif.error('image is too large!');
        return false;
    }

    return true;
  }
}
