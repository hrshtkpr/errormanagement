import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideNavOpen:boolean = true;
  title = 'Error Management';

  sideNavToggle() {
    this.sideNavOpen = !this.sideNavOpen;
  }

}
