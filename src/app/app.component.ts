import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideNavOpen: boolean;

  constructor() {
    this.sideNavOpen = true;
  }

  openSideNav(isNavBarOpen) {
    this.sideNavOpen = isNavBarOpen;
  }
}
