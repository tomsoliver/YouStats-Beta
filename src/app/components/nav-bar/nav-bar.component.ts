import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ys-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  faBars = faBars;
  navbarHidden: boolean;

  constructor() {
  }

  ngOnInit() {
    this.navbarHidden = false;
  }

  toggleNavbar() {
    this.navbarHidden = !this.navbarHidden;
  }
}
