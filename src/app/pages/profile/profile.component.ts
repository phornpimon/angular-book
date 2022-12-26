import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public imgURL: any
  public input: any
  public imagePath: any
  public message: any

  constructor(
    private router: Router,
    private userservice: UserService,
    private ngbModal: NgbModal,
    private profileservice: ProfileService
  ) { }

  ngOnInit(): void {
    this.imgURL = 'assets/image/user_icon.jpg'
    this.input = {
      role: 'USER',
      image: null,
      name: new FormControl(),
      birthDate: new FormControl(),
      day: Blob,
      month: Blob,
      year: Blob,
      telephone: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    }

    let token = localStorage.getItem('token')
    let username = localStorage.getItem('username')
    this.profileservice.getProfile(username, token).subscribe((data: any) =>{
      console.log(`data`,data)
      this.imgURL = `https://storage-enjoybook.s3.us-west-2.amazonaws.com/`+data.image
      this.input.name.value = data.name
      this.input.telephone.value = data.telephone
      this.input.email.value = data.email
      this.input.address.value = data.address
      this.input.birthDate.value = data.birthDate
    })
  }

  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath =files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  changedDate(event: any) {
    this.input.day = event.day
    this.input.month = event.month
    this.input.year = event.year    
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('role',this.input.role)
    formData.append('image',this.imagePath)
    formData.append('name', this.input.name.value)
    formData.append('birthDay', this.input.day)
    formData.append('birthMonth', this.input.month)
    formData.append('birthYear', this.input.year)
    formData.append('telephone', this.input.telephone.value)
    formData.append('email', this.input.email.value)
    formData.append('address', this.input.address.value)
    formData.append('username', this.input.username.value)
    formData.append('password', this.input.password.value)

    this.userservice.register(formData).subscribe((data: any) => {
      if (data) {
        this.popup()
      }
    })
  }

  popup() {
		const modalRef = this.ngbModal.open(
      PopUpComponent,
      { centered: true });
		modalRef.componentInstance.message = 'สมัครสมาชิก Enjoy Book สำเร็จ';
    modalRef.closed.subscribe(result => {
      if (result) {
        this.router.navigateByUrl("/login")
      }
    })
	}
}
