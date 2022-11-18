import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginDetail } from 'src/app/shared/classes/login-detail';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginDetail = new LoginDetail()

  form: FormGroup

  public input: any

  constructor(
    private userService: UserService,
    private router: Router,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.input = {
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    }
    // if (this.userService.isLoggedIn()) {
    //   this.router.navigate(['/profile'])
    // } else {
    //   this.router.navigate(['/login'])
    // }
  }

  Login() {
    this.loginDetail.username = this.input.username.value
    this.loginDetail.password = this.input.password.value

    if (this.loginDetail.username && this.loginDetail.password) {
      this.userService.login(this.loginDetail).subscribe({
        next: (next) => {
          if (next) {
            localStorage.setItem("username" , next.username);  
            localStorage.setItem("token" , next.token);
  
            this.router.navigate(['/profile'])
          }
  
        },
        error: (error) => {
          console.log(`error`,error)
          if (error.status == '401') {
            alert('user password ไม่ถูกต้อง')
          }
        }
      })
    } else {
      alert('กรอกข้อมูลให้ครบถ้วน')
    }
  }
}
