import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RedefinePasswordComponent } from './components/redefine-password/redefine-password.component';
import { EmailRedefinePasswordComponent } from './components/email-redefine-password/email-redefine-password.component';
import { authGuard } from './guard/auth/auth.guard';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {path: 'email-redefine-password', component: EmailRedefinePasswordComponent},
  {path: 'redefine-password/:hash', component: RedefinePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
