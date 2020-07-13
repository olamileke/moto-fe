import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { RequestData } from '../../models/request.data';
import { RequestsData } from '../../models/requests.data';
import { Request } from '../../models/request';
import { FileService } from '../../services/file.service';
import { NotifService } from '../../services/notif.service';
import { IssueService } from '../../services/issue.service';
import { IssueData } from '../../models/issue.data';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private fb:FormBuilder, private request_service:RequestService,
  private file:FileService, private notif:NotifService, private issue:IssueService) { }

  ngOnInit(): void {
    this.checkActiveRequest();
  }

  dataFetched:boolean = false;
  activeRequest:boolean = false;
  imageUploaded:boolean = false;
  reportForm:FormGroup;
  request:Request;
  @ViewChild('fileInput') fileInput;
  @ViewChild('maintenanceImage') maintenanceImage;
  @Output() view = new EventEmitter();
  maintenancePicture;

  checkActiveRequest(): void {
    this.request_service.get(false, 1, true).subscribe((res:RequestData | RequestsData) => {
        this.dataFetched = true;
        if(res.data['request']) {
            this.request = res.data['request'];
            this.activeRequest = true;
            this.createForm(this.request);
        }
    })
  }

  createForm(request:Request): void {
    this.reportForm = this.fb.group({
        title:['', [Validators.required, Validators.minLength(8)]],
        description:['', [Validators.required, Validators.minLength(80)]]
    })
  }

  submit(form:FormGroup): void {
    if(!this.maintenancePicture) {
        this.notif.error('picture is required');
        return;
    }

    const formData = new FormData();
    formData.append('title', this.reportForm.get('title').value);
    formData.append('description', this.reportForm.get('description').value);
    formData.append('vehicleID', this.request.vehicle._id);
    formData.append('image', this.maintenancePicture);

    this.issue.create(formData).subscribe((res:IssueData) => {
        this.notif.success('Issue recorded successfully');
        this.viewMaintenance();
        console.log(res);
    })
  }

  viewMaintenance(): void {
    this.view.emit('maintenance');
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
            this.maintenanceImage.nativeElement.src = e.target.result;
            this.maintenancePicture = file;
        }

        reader.readAsDataURL(file);
    }
  }

  get title(): any {
    return this.reportForm.get('title');
  }

  get description(): any {
    return this.reportForm.get('description');
  }

}
