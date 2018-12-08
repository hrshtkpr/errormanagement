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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filter: Filter;
  serviceInProgress: boolean;
  flatTransactions: FlatTransaction[];
  displayedColumns = [];
  dataSource: MatTableDataSource<FlatTransaction>;
  constructor(private transactionService: TransactionService) {
    this.filter = null;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.flatTransactions);
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
        this._refreshTableStructure();
        this.serviceInProgress = false;
      });
    }
  }

  private _refreshTableStructure() {
    // get latest property set
    let newProperties: string [] = null;
    if (this.flatTransactions != null && this.flatTransactions.length > 0) {
      for (const lflatTransaction of this.flatTransactions) {
        for (const flatTransactionProperty in lflatTransaction ) {
          if (newProperties == null) {
            newProperties = [flatTransactionProperty];
          } else if (newProperties.find(property => property === flatTransactionProperty) == null) {
            newProperties.push(flatTransactionProperty );
          }
        }
      }
    }
    this.displayedColumns = [];
    if (newProperties != null) {
      this.displayedColumns = newProperties.slice();
    }

    this.dataSource.data = this.flatTransactions;
    this.dataSource.paginator = this.paginator;
  }
}
