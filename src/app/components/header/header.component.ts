import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';
import { NotifService } from '../../services/notif.service';
import { UserData } from 'src/app/models/user.data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private user_service:UserService, private file:FileService, private notif:NotifService) { }
  user:User;
  showOptions:boolean = false;
  imageUploaded:boolean = false;
  selectedUserImage:File;
  @ViewChild('fileInput') fileInput;
  @ViewChild('userImage') userImage;

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('moto_user'));
  }

  clipName(name:string): string {
    if(name.length > 13) {
        return name.slice(0,13) + '...';
    }
    return name;
  }

  setImage(fileInput:any): void {
    const file = fileInput.files[0];

    if(this.file.validate(file)) {
        const reader = new FileReader();

        reader.onload = e => {
            this.userImage.nativeElement.src = e.target.result;
            this.selectedUserImage = file;
            this.imageUploaded = true;
        }

        reader.readAsDataURL(file);
    }
  }

  updateAvatar(): void {
    const formData = new FormData();
    formData.append('image', this.selectedUserImage);
    
    this.user_service.edit(formData).subscribe((res:UserData) => {
        this.notif.success('Avatar changed successfully');
        this.user = res.data.user;
        localStorage.setItem('moto_user', JSON.stringify(res.data.user));
    })
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  logout(): void {
    this.user_service.logout();
  }

  fileClick(): void {
    this.fileInput.nativeElement.click();
  }

}
