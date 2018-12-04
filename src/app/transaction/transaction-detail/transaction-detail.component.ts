import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TransactionService} from '../transaction.service';
import {EventASML, FlatEvent, FlatTransaction, Transaction} from '../transaction.model';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit{
  // expandEnabled: boolean = true;
  TransactionID: string;
  entries: FlatEvent[];

  constructor(private route: ActivatedRoute, private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.TransactionID = params['TransactionID'];
      console.log(this.TransactionID);
      this.transactionService.getEvents({TransactionID: this.TransactionID}).subscribe(response => {
        if (response['Events']['Event'] !== null) {
          const events: EventASML[] = response['Events']['Event'];
          console.log(events);
          const flatEvents: FlatEvent[] = events.map(event => new FlatEvent(event));
          console.log(flatEvents);
          this.entries = flatEvents;
        } else {
          this.entries = null;
        }
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
      this.transactionService.getEvent(event.ID, event.EventType).subscribe(response => {
        if (response !== null) {
          console.log(response);
          if (response['Event'] != null && response['Event']['ExceptionDetail'] != null &&
            response['Event']['ExceptionDetail']['DumpAnalysis']) {
            event.DumpAnalysis = response['Event']['ExceptionDetail']['DumpAnalysis'];
          }
          if (response['Event'] != null && response['Event']['Context'] != null &&
            response['Event']['Context']['TransactionData'] != null) {
            event.TransactionData = response['Event']['Context']['TransactionData'];
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
}
