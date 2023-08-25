import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { RedefinePasswordInput } from 'src/app/models/redefine-password/redefinePasswordInput';
import { RedefinePasswordService } from 'src/app/services/redefine-password/redefine-password.service';

@Component({
  selector: 'app-redefine-password',
  templateUrl: './redefine-password.component.html',
  styleUrls: ['./redefine-password.component.css']
})
export class RedefinePasswordComponent implements OnInit {

  formRedefinePassword: FormGroup;
  showErrorMessages: boolean = false;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private redefinePasswordService: RedefinePasswordService, private route: Router) {
    this.formRedefinePassword = formBuilder.group({
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
    const hash = this.activatedRoute.snapshot.paramMap.get('hash');
    this.redefinePasswordService.verifyHash(hash).subscribe({
      error: (erro) => {
        if (erro.error && erro.error.message) {
          this.errorMessages.push(erro.error.message);
          this.formRedefinePassword.get('password')?.disable();
          this.formRedefinePassword.get('repeatPassword')?.disable();
        } else {
          this.errorMessages.push('Ocorreu um erro inesperado. Tente mais tarde, por favor!');
        }
      }
    });
  }

  submitForm() {
    const hash = this.activatedRoute.snapshot.paramMap.get('hash');
    this.errorMessages = [];

    let redefinePasswordInput = this.formRedefinePassword.getRawValue() as RedefinePasswordInput;

    this.redefinePasswordService.redefinePassword(redefinePasswordInput, hash).subscribe({
      next: (data) => {
        const navigationExtras: NavigationExtras = { state: { successData: `Senha alterada com sucesso!` } }
        this.route.navigate(['login'], navigationExtras)
      },
      error: (erro) => {
        if (erro.error && erro.error.message) {
          this.errorMessages.push(erro.error.message);
        } else {
          this.errorMessages.push('Ocorreu um erro inesperado. Tente mais tarde, por favor!');
        }
      }
    });
  }

}
