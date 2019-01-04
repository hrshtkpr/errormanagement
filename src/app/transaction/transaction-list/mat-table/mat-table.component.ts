import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() rowCount: number;
  @Input() rows: any[];
  @Output() transactionIDSelected: EventEmitter<string>;
  @Output() pageChanged: EventEmitter<{pageIndex: string, pageSize: string, startPosition: string}>;
  displayedColumns = [];
  dataSource: MatTableDataSource<any>;

  constructor() {
    this.transactionIDSelected = new EventEmitter(true);
    this.pageChanged = new EventEmitter(true);
  }

  onTransactionIDClicked(transactionID: string) {
    this.transactionIDSelected.emit(transactionID);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.rows);
    this._registerObservables();
  }

  private _registerObservables() {
    this.paginator.page.subscribe(
      () => {
        const pageIndex: string = this.paginator.pageIndex.toString();
        const pageSize: string = this.paginator.pageSize.toString();
        this.pageChanged.emit({pageIndex: pageIndex, pageSize: pageSize,
          startPosition: (this.paginator.pageIndex * this.paginator.pageSize).toString()});
      }
    );
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
    }
  }
}
