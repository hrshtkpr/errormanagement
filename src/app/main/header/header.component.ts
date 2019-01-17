import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sideNavOpen: boolean;
  title: string;
  @Output()
  toggleSideNav: EventEmitter<boolean> = new EventEmitter(true);
  sideNavToggle() {
    this.sideNavOpen = !this.sideNavOpen;
    this.toggleSideNav.emit(this.sideNavOpen);
    // console.log(this.sideNavOpen);
  }

  constructor() {
    this.sideNavOpen = true;
    this.title = 'TIBCO Event Manager';
  }

  ngOnInit() {
  }

}




