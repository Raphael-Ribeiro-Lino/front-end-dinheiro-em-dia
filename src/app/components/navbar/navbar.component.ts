import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const svgElement = this.elementRef.nativeElement.querySelector('#logoutIcon');

    svgElement.addEventListener('click', () => {
      localStorage.removeItem('token');
    });
  }

}
