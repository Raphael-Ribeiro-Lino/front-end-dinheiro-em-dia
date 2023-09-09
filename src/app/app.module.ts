import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RedefinePasswordComponent } from './components/redefine-password/redefine-password.component';
import { EmailRedefinePasswordComponent } from './components/email-redefine-password/email-redefine-password.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading/loading.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ListBudgetsComponent } from './components/budget/list-budgets/list-budgets.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RegisterBudgetComponent } from './components/budget/register-budget/register-budget.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    RedefinePasswordComponent,
    EmailRedefinePasswordComponent,
    LoadingComponent,
    NavbarComponent,
    NotFoundPageComponent,
    ListBudgetsComponent,
    PaginationComponent,
    RegisterBudgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
