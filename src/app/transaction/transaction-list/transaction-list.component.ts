import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../transaction.service';
import {FlatTransaction, Transaction} from '../transaction.model';
import {Filter} from '../../shared/components/mat-filter/mat-filter.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  technicalReferences = ['TransactionID', 'BusinessDomain', 'TechnicalDomain', 'Component', 'Service', 'BusinessOperation'];
  exceptionReferences = ['ExceptionCategory', 'ExceptionType', 'ExceptionCode', 'ExceptionMessage'];
  businessReferences = ['BusinessReference1', 'BusinessReference2'];
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
