import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public imgURL: any
  public input: any
  public imagePath: any
  public message: any

  constructor(
    private router: Router,
    private userservice: UserService,
    private ngbModal: NgbModal
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
