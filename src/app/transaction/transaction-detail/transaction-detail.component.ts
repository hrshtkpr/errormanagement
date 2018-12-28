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
import {EventSelected} from '../transaction.actions';


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

  constructor(public dialog: MatDialog, private store: Store<AppState>, private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.entries$ = this.store.pipe(
      select(selectTransactionASMLEventList),
      tap(response => response.filter(asmlEvt => (!(asmlEvt.EventType === 'L' && (asmlEvt.EventStatus === 'Error-Entrypoint'
        || asmlEvt.EventStatus === 'Warning-Entrypoint'))))),
      map(response => response.map(evt => new FlatEvent(evt)))
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

  onDotClick(event: FlatEvent) {
    if (event.DumpAnalysis == null && event.TransactionData == null) {
      this.transactionService.getEvent(event.ID, {Type: event.EventType}).subscribe(response => {
        if (response !== null) {
          console.log(response);
          if (response['Event'] != null && response['Event']['ExceptionDetail'] != null &&
            response['Event']['ExceptionDetail']['DumpAnalysis'] != null) {
            event.DumpAnalysis = decodeURIComponent(response['Event']['ExceptionDetail']['DumpAnalysis']);
            event.TransactionData = decodeURIComponent(response['Event']['ExceptionDetail']['TransactionData']);
          }
          if (response['Event'] != null && response['Event']['LogDetail'] != null &&
            response['Event']['LogDetail']['TransactionData'] != null) {
            event.TransactionData = decodeURIComponent(response['Event']['LogDetail']['TransactionData']);
          }
          if (response['Event'] != null && response['Event']['Context'] != null &&
            response['Event']['Context']['BusinessRefs'] != null) {
            event.BusinessRefs = response['Event']['Context']['BusinessRefs'];
            console.log(event);
          }
        }
      });
    }

    // evt.stopPropagation();
  }
}
