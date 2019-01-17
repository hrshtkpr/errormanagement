import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FlatEvent} from '../../transaction.model';

@Component({
  selector: 'app-mat-timeline',
  templateUrl: './mat-timeline.component.html',
  styleUrls: ['./mat-timeline.component.scss']
})
export class MatTimelineComponent implements OnInit, OnChanges {
  @Input() entriesInput: FlatEvent[];
  @Output() entrySelected: EventEmitter<FlatEvent>;
  @Output() dialogSelected: EventEmitter<{ title: string, flatEvent: FlatEvent }>;
  serviceInProgress: boolean;
  private _entries: FlatEvent[];

  constructor() {
    this.entrySelected = new EventEmitter(true);
    this.dialogSelected = new EventEmitter(true);
  }

  ngOnInit() {

    this.compareAndUpdate();
  }

  ngOnChanges() {
    this.compareAndUpdate();
  }

  // this is being done to ensure that only objects that have changes are updated, else complete component is reloaded
  // and all expanded panes collapse
  compareAndUpdate() {
    // when user selects a transaction and then navigates back to transaction list and selects another transaction
    if (this._entries && this.entriesInput && this._entries.length > 0 && this.entriesInput.length > 0 &&
      this._entries[0].ID !== this.entriesInput[0].ID) {
      this._entries = this.entriesInput;
    } else if (this._entries && this._entries.length > 0 && this.entriesInput.length > 0) {
      // when user clicks dump-analysis and transaction-data of an event in a transaction
      this.entriesInput.forEach((val, idx) => {
        if (this.entriesInput[idx] && this.entriesInput[idx].BusinessRefs && this.entriesInput[idx].BusinessRefs.BusinessRef &&
          this.entriesInput[idx].BusinessRefs.BusinessRef.length > 0) {
          this._entries[idx].BusinessRefs.BusinessRef = val.BusinessRefs.BusinessRef;
          // console.log(this._entries[idx].BusinessRefs.BusinessRef);
        }
      });
    } else { // when user selects a transaction from transaction list for the first time
      this._entries = this.entriesInput;
    }
  }

  onDotClick(event: FlatEvent) {
    // this.entrySelected.emit(event);
    // evt.stopPropagation();
  }

  onHeaderClick(event: FlatEvent) {
  }

  onExpandEntry(event: FlatEvent, idx: number) {
    // // console.log(`Expand status of entry #${idx} changed to ${expanded}`);
  }

  openDialog(title: string, flatEvent: FlatEvent): void {
    this.dialogSelected.emit({title: title, flatEvent: flatEvent});
  }

  decode(str: string): string {
    return decodeURIComponent(str);
  }

}
