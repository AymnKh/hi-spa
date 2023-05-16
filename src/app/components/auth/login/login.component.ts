import { TokenService } from './../../../services/token.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export interface UserLoginResponse {
  token: string;
  message: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';
  loginForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.formInit();// initialize form
  }
  formInit() {
    this.loginForm = new FormGroup({ // initialize form group
      'user': new FormControl("", [Validators.required]),
      'password': new FormControl("", [Validators.required]),
    });
  }
  login() {
    const user = this.loginForm.value;
    this.authService.login(user).subscribe({ // subscribe to login observable
      next: (res: UserLoginResponse) => {
        res.token &&
          this.tokenService.setToken(res.token); // save token in cookie

      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message; // show error message
      },
      complete: () => {
        this.router.navigate(['/streams']); // redirect to stream page
      }
    })
  }
}
