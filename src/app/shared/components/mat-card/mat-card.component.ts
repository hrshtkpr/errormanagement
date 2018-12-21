import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mat-card',
  templateUrl: './mat-card.component.html',
  styleUrls: ['./mat-card.component.scss']
})
export class MatCardComponent implements OnInit {
  @Input() subtitle: string;
  @Input() title: string;
  constructor() {
  }

  ngOnInit() {
  }

}
