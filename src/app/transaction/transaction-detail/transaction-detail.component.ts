import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TransactionService} from '../transaction.service';
import {EventASML, FlatEvent} from '../transaction.model';
import {MatDialog} from '@angular/material';
import {MatDialogComponent} from '../../shared/components/mat-dialog/mat-dialog.component';


@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  // expandEnabled: boolean = true;
  serviceInProgress: boolean;
  TransactionID: string;
  entries: FlatEvent[];

  constructor(private route: ActivatedRoute, private transactionService: TransactionService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.serviceInProgress = true;
    this.route.params.subscribe(params => {
      this.TransactionID = params['TransactionID'];
      this.transactionService.getEvents({TransactionID: this.TransactionID}).subscribe(response => {
        if (response['Events']['Event'] !== null) {
          const events: EventASML[] = response['Events']['Event'];
          console.log(events);
          const flatEvents: FlatEvent[] = events.filter(event => (!(event.EventType === 'L' && (event.EventStatus === 'Error-Entrypoint'
            || event.EventStatus === 'Warning-Entrypoint'))))
            .map(event => new FlatEvent(event));
          console.log(flatEvents);
          this.entries = flatEvents;
        } else {
          this.entries = null;
        }
        this.serviceInProgress = false;
      });

    });
  }

  onHeaderClick(event) {
    // if (!this.expandEnabled) {
    //   event.stopPropagation();
    // }

    // event.stopPropagation();
  }

  onDotClick(evt, event: FlatEvent) {
    console.log('Dot Clicked');
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


  onExpandEntry(expanded, index) {
    console.log(`Expand status of entry #${index} changed to ${expanded}`);
    // expanded.stopPropagation();
  }


  openDialog(title: string, flatEvent: FlatEvent): void {

    if (flatEvent.DumpAnalysis == null && flatEvent.TransactionData == null) {
      this.transactionService.getEvent(flatEvent.ID, {Type: flatEvent.EventType}).subscribe(response => {
        if (response !== null) {
          console.log(response);
          if (response['Event'] != null && response['Event']['ExceptionDetail'] != null &&
            response['Event']['ExceptionDetail']['DumpAnalysis'] != null) {
            flatEvent.DumpAnalysis = decodeURIComponent(response['Event']['ExceptionDetail']['DumpAnalysis']);
            flatEvent.TransactionData = decodeURIComponent(response['Event']['ExceptionDetail']['TransactionData']);
          }
          if (response['Event'] != null && response['Event']['LogDetail'] != null &&
            response['Event']['LogDetail']['TransactionData'] != null) {
            flatEvent.TransactionData = decodeURIComponent(response['Event']['LogDetail']['TransactionData']);
          }
        }
      });
    }


    const dialogRef = this.dialog.open(MatDialogComponent, {
      // width: '500px',
      data: {title: title, flatEvent: flatEvent}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
