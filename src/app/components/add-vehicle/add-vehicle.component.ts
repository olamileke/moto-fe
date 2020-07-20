import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FileService } from '../../services/file.service';
import { NotifService } from '../../services/notif.service';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleData } from '../../models/vehicle.data';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  constructor(private fb:FormBuilder, private notif:NotifService, private file:FileService, private vehicle:VehicleService) { }

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
        plate_number:['', [Validators.required, Validators.minLength(9)]]
    })
  }

  fileClick(): void {
    this.fileInput.nativeElement.click();
  }

  submit(form:FormGroup): void {

    if(!this.vehicle_picture) {
        this.notif.error('Vehicle picture is required');
        return;
    }

    const formData = new FormData();
    formData.append('model', form.get('model').value);
    formData.append('image', this.vehicle_picture);
    formData.append('plate_number', form.get('plate_number').value);

    this.vehicle.create(formData).subscribe((res:VehicleData) => {
        form.reset();
        this.imageUploaded = false;
        this.notif.success('Vehicle added successfully');
    })
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

  get model(): any {
    return this.addForm.get('model');
  }

  get plate_number(): any {
    return this.addForm.get('plate_number');
  }
}
