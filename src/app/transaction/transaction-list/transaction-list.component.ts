import { Component, OnInit } from '@angular/core';
import {Filter} from './transaction-filter/transaction-filter.component';
import {TransactionService} from '../transaction.service';
import {Logs, Context, FlatLog, Log} from '../transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  flatLogs: FlatLog;

  columnsToDisplay: string[] = ['TransactionID', 'JobKey', 'DateTime', 'Event',
    'BusinessDomain', 'TechnicalDomain', 'ComponentName', 'ServiceName',
    'BusinessOperation', 'BusinessConcept', 'HostName'];
  dataSource: FlatLog[];
  // dataSource: MatTableDataSource<ChangeRequest>;
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  }

  onFilterChange(filter: Filter) {
    this.transactionService.getTransactions(filter).subscribe(response => {
      if (response['FlatLogs'] !== null) {
        const flatlogs: FlatLog[] = response['FlatLogs'];
        // this.dataSource = logs.map(log => new FlatLog(log));
        this.dataSource = flatlogs;
      } else {
        this.dataSource = null;
      }
    });
  }

}
