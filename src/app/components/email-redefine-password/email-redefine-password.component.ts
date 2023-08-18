import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { EmailRedefinePasswordInput } from 'src/app/models/email-redefine-password/emailRedefinePasswordInput';
import { EmailRedefinePasswordService } from 'src/app/services/email-redefine-password/email-redefine-password.service';

@Component({
  selector: 'app-email-redefine-password',
  templateUrl: './email-redefine-password.component.html',
  styleUrls: ['./email-redefine-password.component.css']
})
export class EmailRedefinePasswordComponent implements OnInit {

  formEmailRedefinePassword: FormGroup;
  showErrorMessages: boolean = false;
  loading: boolean = false;
  errorMessages: string[] = [];
  emailSentSuccessfully: string = '';

  constructor(private formBuilder: FormBuilder, private emailRedefinePasswordService: EmailRedefinePasswordService, private route: Router) {
    this.formEmailRedefinePassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(320), Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")]]
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.loading = true;
    let emailRedefinePasswordInput = this.formEmailRedefinePassword.getRawValue() as EmailRedefinePasswordInput;
    console.log(this.formEmailRedefinePassword.get('email')?.value);
    
    this.emailRedefinePasswordService.sendEmailRedefinePassword(emailRedefinePasswordInput).subscribe({
      next: (data) => {
        const navigationExtras: NavigationExtras = { state: { successData: `Email para ${this.formEmailRedefinePassword.get('email')?.value} foi enviado com sucesso!` } }
        this.route.navigate(['login'], navigationExtras);
      },
      error: (erro) => {
        if (erro.error && erro.error.message) {
          this.errorMessages.push(erro.error.message);
        } else {
          this.errorMessages.push('Ocorreu um erro inesperado. Tem mais tarde, por favor!');
        }
        this.loading = false;
        setTimeout(() => {
          this.errorMessages = [];
        }, 3000);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
