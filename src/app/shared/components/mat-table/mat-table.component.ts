import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() rows: any[];
  displayedColumns = [];
  dataSource: MatTableDataSource<any>;

  constructor() {
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
      for (const lflatTransaction of this.rows) {
        for (const flatTransactionProperty in lflatTransaction) {
          if (newProperties == null) {
            newProperties = [flatTransactionProperty];
          } else if (newProperties.find(property => property === flatTransactionProperty) == null) {
            newProperties.push(flatTransactionProperty);
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
