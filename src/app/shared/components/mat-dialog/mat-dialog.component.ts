import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {selectASMLEvent} from '../../../transaction/transaction.selectors';
import {filter, map, tap} from 'rxjs/operators';
import {FlatEvent} from '../../../transaction/transaction.model';
import {Observable} from 'rxjs';

export interface DialogData {
  title: string;
  Content: string;
}

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {

  data$: Observable<FlatEvent>;

  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private store: Store<AppState>) {
  }

  onDoneClick(): void {
    this.data$ = null;
    this.dialogRef.close();
  }

  dump(obj: Object): string {
    return JSON.stringify(obj);
  }
  ngOnInit() {

    this.data$ = this.store.pipe(
      select(selectASMLEvent),
      filter(x => !!x),
      map(response => new FlatEvent(response))
    );
  }
}
