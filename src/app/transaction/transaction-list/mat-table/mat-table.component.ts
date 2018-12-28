import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() rows: any[];
  @Output() transactionIDSelected: EventEmitter<string>;
  displayedColumns = [];
  dataSource: MatTableDataSource<any>;

  constructor() {
    this.transactionIDSelected = new EventEmitter(true);
  }

  onTransactionIDClicked(transactionID: string) {
    this.transactionIDSelected.emit(transactionID);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.rows);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._refreshTableStructure();
  }

  private _refreshTableStructure() {
    let newProperties: string [] = null;
    if (this.rows != null && this.rows.length > 0) {
      for (const lrow of this.rows) {
        for (const lcolumn in lrow) {
          if (newProperties == null) {
            newProperties = [lcolumn];
          } else if (newProperties.find(property => property === lcolumn) == null) {
            newProperties.push(lcolumn);
          }
        }
      }
    }
    this.displayedColumns = [];
    if (newProperties != null) {
      this.displayedColumns = newProperties.slice();
    }

    if (this.dataSource != null && this.dataSource !== undefined) {
      this.dataSource.data = this.rows;
      this.dataSource.paginator = this.paginator;
    }

  }
}
