import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInput } from 'src/app/models/login/loginInput';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { LoginOutput } from 'src/app/models/login/loginOutput';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  showErrorMessages: boolean = false;
  errorMessages: string[] = [];
  successfullyRegisteredUser: string = '';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private route: Router) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(320), Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]]
    });
    const currentNavigation = route.getCurrentNavigation();
    if (currentNavigation?.extras?.state?.['successData']) {
      this.successfullyRegisteredUser = currentNavigation?.extras?.state?.['successData'];
      setTimeout(() => {
        this.successfullyRegisteredUser = "";
      }, 3000);
    }
  }

  submitForm() {
    this.errorMessages = [];
    let loginInput = this.formLogin.getRawValue() as LoginInput;

    this.loginService.auth(loginInput).subscribe({
      next: (data: LoginOutput) => {
        localStorage.setItem('token', data.token);
        this.route.navigate(["home"]);
      },
      error: (error) => {
        if (error.error && error.error.message) {
          this.errorMessages.push(error.error.message);
        } else {
          this.errorMessages.push('Ocorreu um erro inesperado. Tente mais tarde, por favor!');
        }
      }
    }
    );
  }

  ngOnInit(): void {
  }

}
