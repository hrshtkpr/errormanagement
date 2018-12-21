import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FlatTransaction, Transaction} from '../../transaction.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnChanges, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() flatTransactions: FlatTransaction[];
  displayedColumns = [];
  dataSource: MatTableDataSource<FlatTransaction>;
  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.flatTransactions);
  }

  private _refreshTableStructure() {
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

  ngOnChanges(changes: SimpleChanges): void {
    this._refreshTableStructure();
  }
}
