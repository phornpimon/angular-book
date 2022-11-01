import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loading = false;
  public submitted = false;

  public input: any

  public imagePath: any
  public imgURL: any
  public message: any

  constructor(
    public userservice: UserService,
  ) { }

  ngOnInit(): void {
    this.imgURL = 'assets/image/user_icon.jpg'
    this.input = {
      role: 'USER',
      image: null,
      name: new FormControl(),
      birthDate: new FormControl(),
      telephone: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    }
  }

  preview(files: any) {
    console.log(`files`,files[0])
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

  onSubmit() {
    let day = this.input.birthDate.value.day
    let momth = this.input.birthDate.value.momth
    let year = this.input.birthDate.value.year
    const formData = new FormData();
    formData.append('role',this.input.role)
    formData.append('image',this.imagePath)
    formData.append('name', this.input.name.value)
    formData.append('birthDay', day)
    formData.append('birthMonth', momth)
    formData.append('birthYear', year)
    formData.append('telephone', this.input.telephone.value)
    formData.append('email', this.input.email.value)
    formData.append('address', this.input.address.value)
    formData.append('username', this.input.username.value)
    formData.append('password', this.input.password.value)

    this.userservice.register(formData).subscribe((data: any) => {
      if (data) {
        console.log(`data`,data)
      }
    })
  }
}
