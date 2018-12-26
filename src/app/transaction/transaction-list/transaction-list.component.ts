import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionService} from '../transaction.service';
import {FlatTransaction, Transaction} from '../transaction.model';
import {Filter} from '../../shared/components/mat-filter/mat-filter.component';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {FilterUpdated} from '../transaction.actions';
import {selectTransactionList, selectTransactionListLoading} from '../transaction.selectors';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  technicalReferences = ['TransactionID', 'BusinessDomain', 'TechnicalDomain', 'Component', 'Service', 'BusinessOperation'];
  exceptionReferences = ['ExceptionCategory', 'ExceptionType', 'ExceptionCode', 'ExceptionMessage'];
  businessReferences = ['BusinessReference1', 'BusinessReference2'];
  flatTransactions$: Observable<FlatTransaction[]>;
  transactionListLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.flatTransactions$ = this.store.pipe(
      select(selectTransactionList),
      map(response => response.map(tx => new FlatTransaction(tx))),
    );
    this.transactionListLoading$ = this.store.pipe(
      select(selectTransactionListLoading)
    );
  }

  onFilterChange(filter: Filter) {
    this.store.dispatch(new FilterUpdated({filter}));
  }
}
