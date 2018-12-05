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
  flatTransactions: FlatTransaction[];
  displayedColumns = [];
  dataSource: MatTableDataSource<FlatTransaction>;
  constructor(private transactionService: TransactionService) {
    this.filter = {};
  }

  ngOnInit() {
    this._getTransactions();
    this._refreshTableStructure();
    this.dataSource = new MatTableDataSource(this.flatTransactions);
    this.dataSource.paginator = this.paginator;
  }

  onFilterChange(filter: Filter) {
    this.filter = filter;
    this._getTransactions();
    this._refreshTableStructure();
    this.dataSource = new MatTableDataSource(this.flatTransactions);
    console.log(filter);
    console.log(this.flatTransactions);
    console.log(this.displayedColumns);
  }

  private _getTransactions() {
    this.transactionService.getTransactions(this.filter).subscribe(response => {
      console.log(this.filter);
      if (response['Transactions']['Transaction'] !== null) {
        const transactions: Transaction[] = response['Transactions']['Transaction'];
        this.flatTransactions = transactions.map(transaction => new FlatTransaction(transaction));
        console.log(this.flatTransactions);
      } else {
        this.flatTransactions = null;
      }
    });
  }

  private _refreshTableStructure() {
    // get latest property set
    let newProperties: string [] = null;
    if (this.flatTransactions != null) {
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
  }
}
