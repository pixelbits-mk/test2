import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { LoginInfo } from '../../models/login-info';

@Component({
  selector: 'pixelbits-mk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup
  constructor(private authService: AuthService) {
    this.formGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit() {
  }
  onLogin() {
    if (this.formGroup.valid) {
      const loginInfo: LoginInfo = this.formGroup.value
      console.log(loginInfo)
      this.authService.login(loginInfo.username, loginInfo.password)
    }
  }
  onGoogleLogin() {
    this.authService.googleLogin()
  }

}
