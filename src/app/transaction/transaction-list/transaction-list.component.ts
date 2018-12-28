import {Component, OnInit} from '@angular/core';
import {FlatTransaction} from '../transaction.model';
import {Filter} from '../../shared/components/mat-filter/mat-filter.component';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {FilterUpdated, TransactionSelected} from '../transaction.actions';
import {selectTransactionList, selectTransactionListLoading} from '../transaction.selectors';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

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

  constructor(private store: Store<AppState>, private router: Router) {
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

  onTransactionIDSelected(transactionID: string) {
    this.store.dispatch(new TransactionSelected({transactionID: transactionID}));
    this.router.navigate(['transaction', transactionID]);
  }
}
