import {Component, OnInit} from '@angular/core';
import {FlatEvent} from '../transaction.model';
import {MatDialog} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {selectASMLEvent, selectTransactionASMLEventList} from '../transaction.selectors';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {TransactionService} from '../transaction.service';
import {MatDialogComponent} from '../../shared/components/mat-dialog/mat-dialog.component';
import {EventSelected, TransactionSelected} from '../transaction.actions';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  // expandEnabled: boolean = true;
  serviceInProgress: boolean;
  entries$: Observable<FlatEvent[]>;
  entry$: Observable<FlatEvent>;
  constructor(public dialog: MatDialog, private store: Store<AppState>, private readonly _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.store.dispatch(new TransactionSelected({transactionID: this._activatedRoute.snapshot.params['TransactionID']}));

    this.entries$ = this.store.pipe(
      select(selectTransactionASMLEventList),
      map(response => response.filter(asmlEvt => (asmlEvt.EventType === 'E' ||
                                                          (asmlEvt.EventType === 'L' && asmlEvt.EventStatus !== 'Warning-Entrypoint'
                                                          && asmlEvt.EventStatus !== 'Error-Entrypoint')))
                                      .map(evt => new FlatEvent(evt)))
    );
  }

  onEntrySelected(event: FlatEvent) {
    this.store.dispatch(new EventSelected({eventID: event.ID, eventType: event.EventType}));
  }

  onDialogSelected(event) {
    this.store.dispatch(new EventSelected({eventID: event.flatEvent.ID, eventType: event.flatEvent.EventType}));

    const dialogRef = this.dialog.open(MatDialogComponent, {
      // width: '500px',
      data: {title: event.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}
