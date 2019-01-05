import {Component, OnInit} from '@angular/core';
import {BusinessRef, FlatEvent, FlatTransaction} from '../transaction.model';
import {Filter} from '../../shared/components/mat-filter/mat-filter.component';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {FilterUpdated, TechnicalReferenceUpdated} from '../transaction.actions';
import {
  selectBusinessConcept,
  selectBusinessDomain, selectBusinessOperation,
  selectBusinessReferences, selectComponent,
  selectFilter, selectService, selectTechnicalDomain,
  selectTransactionCount,
  selectTransactionList,
  selectTransactionListLoading
} from '../transaction.selectors';
import {combineLatest, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  technicalReferences = ['TransactionID', 'BusinessDomain', 'TechnicalDomain', 'Component', 'Service', 'BusinessOperation'];
  exceptionReferences = ['ExceptionCategory', 'ExceptionType', 'ExceptionCode', 'ExceptionMessage'];
  flatTransactions$: Observable<FlatTransaction[]>;
  _pageData: { pageIndex: string, pageSize: string, startPosition: string };
  _filter: Filter;
  transactionListLoading$: Observable<boolean>;
  selectTransactionCount$: Observable<number>;
  filter$: Observable<Filter>;
  businessReferences$: Observable<BusinessRef[]>;
  _technicalReferenceSelected$: Observable<Filter>;

  constructor(private store: Store<AppState>, private router: Router) {
    this._pageData = {pageIndex: '0', pageSize: '5', startPosition: '0'};
  }

  ngOnInit() {
    this.filter$ = this.store.pipe(
      select(selectFilter),
      tap(response => {
        // console.log(response);
        this._filter = response;
      })
    );
    this.flatTransactions$ = this.store.pipe(
      select(selectTransactionList),
      map(response => response.map(tx => new FlatTransaction(tx))),
    );
    this.selectTransactionCount$ = this.store.pipe(
      select(selectTransactionCount),
      tap(response => {
        // console.log(response);
      })
    );
    this.transactionListLoading$ = this.store.pipe(
      select(selectTransactionListLoading)
    );
    this.businessReferences$ = this.store.pipe(
      select(selectBusinessReferences),
      // map(response => response && response.map(busRef => busRef.Name)),
      // map( response => response && response.length > 0 && Array.from(new Set(response)))
    );

    combineLatest(
      this.store.select(selectService),
      this.store.select(selectComponent),
      this.store.select(selectTechnicalDomain),
      this.store.select(selectBusinessDomain),
      this.store.select(selectBusinessOperation),
      this.store.select(selectBusinessConcept),
    ).pipe(tap( response => this.store.dispatch(new TechnicalReferenceUpdated({filter: this._filter})))).subscribe();
  }

  onFilterChange(filter: Filter) {
    this._filter = filter;
    this.store.dispatch(new FilterUpdated({filter: filter, pageData: this._pageData}));
  }

  onTransactionIDSelected(transactionID: string) {
    this.router.navigate(['transaction', transactionID]);
  }

  onPageChanged(pageData: { pageIndex: string, pageSize: string, startPosition: string }) {
    // console.log(pageData);
    this._pageData = pageData;
    this.store.dispatch(new FilterUpdated({filter: this._filter, pageData: this._pageData}));
  }
}
