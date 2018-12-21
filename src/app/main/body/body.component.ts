import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @Input() sideNavShow: boolean;
  TREE_DATA = {Dashboard: {}, Transaction: {}, Configuration: {Notification: {}, Persistence: {}, Retry: {}}};
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onActiveNodeChange(node) {
    if (node.name.toLowerCase() === 'configuration') {
      return;
    }
    const route = '/' + node.name.toLowerCase();
    console.log(route);
    this._router.navigate([route]);
  }
}
