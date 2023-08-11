import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { RegisterInput } from 'src/app/models/register/registerInput';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  showErrorMessages: boolean = false;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder, private route: Router, private registerService: RegisterService) {
    this.formRegister = formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ -][A-Za-zÀ-ÖØ-öø-ÿ]+)*$")]],
      email: ['', [Validators.required, Validators.maxLength(320), Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]]
    }, {
      validators: this.passwordMatchValidator.bind(this)
    })
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if (password && repeatPassword && password.value !== repeatPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.errorMessages = [];

    let registerInput = this.formRegister.getRawValue() as RegisterInput;

    this.registerService.register(registerInput).subscribe({
      next: (data) => {
        const navigationExtras: NavigationExtras = { state: { successData: `Usuário ${data.name} cadastrado com sucesso!` } }
        this.route.navigate(['login'], navigationExtras)
      },
      error: (erro) => {
        if (erro.error && erro.error.message) {
          this.errorMessages.push(erro.error.message);
        } else {
          this.errorMessages.push('Ocorreu um erro inesperado. Tem mais tarde, por favor!');
        }
      }
    });
  }
}
