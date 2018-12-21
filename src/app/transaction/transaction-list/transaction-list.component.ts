import {Component, OnInit, ViewChild} from '@angular/core';
import {Filter} from './transaction-filter/transaction-filter.component';
import {TransactionService} from '../transaction.service';
import {Transaction, FlatTransaction} from '../transaction.model';
import {MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  filter: Filter;
  serviceInProgress: boolean;
  flatTransactions: FlatTransaction[];
  constructor(private transactionService: TransactionService) {
    this.filter = null;
  }

  ngOnInit() {
    this.serviceInProgress = false;
  }

  onFilterChange(filter: Filter) {
    this.filter = filter;
    this._getTransactions();
  }

  private _getTransactions() {
    if (this.filter != null && Object.keys(this.filter).length > 0 && this.filter.constructor !== Object) {
      this.serviceInProgress = true;
      this.transactionService.getTransactions(this.filter).subscribe(response => {
        if (response['Transactions'] != null && response['Transactions']['Transaction'] !== null) {
          const transactions: Transaction[] = response['Transactions']['Transaction'];
          this.flatTransactions = transactions.map(transaction => new FlatTransaction(transaction));
        } else {
          this.flatTransactions = [];
        }
        this.serviceInProgress = false;
      });
    }
  }
}
