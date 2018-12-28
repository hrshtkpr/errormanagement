import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlatEvent} from '../../transaction.model';

@Component({
  selector: 'app-mat-timeline',
  templateUrl: './mat-timeline.component.html',
  styleUrls: ['./mat-timeline.component.scss']
})
export class MatTimelineComponent implements OnInit {
  @Input() entries: FlatEvent[];
  @Output() entrySelected: EventEmitter<FlatEvent>;
  @Output() dialogSelected: EventEmitter<{ title: string, flatEvent: FlatEvent }>;

  constructor() {
    this.entrySelected = new EventEmitter(true);
    this.dialogSelected = new EventEmitter(true);
  }

  ngOnInit() {
  }

  onDotClick(event: FlatEvent) {
    // this.entrySelected.emit(event);
    // evt.stopPropagation();
  }

  onHeaderClick(event: FlatEvent) {
  }

  onExpandEntry(event: FlatEvent, idx: number) {
    // console.log(`Expand status of entry #${idx} changed to ${expanded}`);
  }

  openDialog(title: string, flatEvent: FlatEvent): void {
    this.dialogSelected.emit({title: title, flatEvent: flatEvent});
  }

}
