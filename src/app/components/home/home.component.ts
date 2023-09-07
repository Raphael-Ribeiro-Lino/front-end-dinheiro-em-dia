import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  errorMessages: string[] = [];
  showErrorMessages: boolean = false;
  name: string = "";
  constructor(private homeService:HomeService){}

  ngOnInit(): void {
    this.errorMessages = [];
    const token = localStorage.getItem('token') as String;
    this.homeService.findUserByToken(token).subscribe({
      next: (data) => {
        this.name = data.name;
      },
      error: (error) => {
        if (error.error && error.error.message) {
          this.errorMessages.push(error.error.message);
        } else {
          this.errorMessages.push('Ocorreu um erro inesperado. Tente mais tarde, por favor!');
        }
      }
    });
  }

}
