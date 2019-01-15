import {Component, OnInit} from '@angular/core';
import {BusinessRef, FlatTransaction, PageData} from '../transaction.model';
import {Filter} from '../../shared/components/mat-filter/mat-filter.component';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {FilterUpdated, TechnicalReferenceUpdated} from '../transaction.actions';
import {
  selectBusinessConcept,
  selectBusinessDomain,
  selectBusinessOperation,
  selectBusinessReferences,
  selectComponent,
  selectFilter,
  selectPageData,
  selectService,
  selectTechnicalDomain,
  selectTransactionCount,
  selectTransactionList,
  selectTransactionListLoading
} from '../transaction.selectors';
import {combineLatest, Observable} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
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
  _pageData: PageData;
  _filter: Filter;
  transactionListLoading$: Observable<boolean>;
  selectTransactionCount$: Observable<number>;
  filter$: Observable<Filter>;
  businessReferences$: Observable<BusinessRef[]>;
  pageData$: Observable<PageData>;

  constructor(private store: Store<AppState>, private router: Router) {
  }


  ngOnInit() {
    this.filter$ = this.store.pipe(
      select(selectFilter),
      tap(response => {
        this._filter = response;
        // this.store.dispatch(new TechnicalReferenceUpdated({filter: this._filter}));
      })
    );
    this.pageData$ = this.store.pipe(
      select(selectPageData),
      tap(response => {
        this._pageData = response;
        // this.store.dispatch(new TechnicalReferenceUpdated({filter: this._filter}));
      }),
      map(response => new PageData(response['pageIndex'], response['pageSize'], response['startPosition'])),
    );
    this.flatTransactions$ = this.store.pipe(
      select(selectTransactionList),
      map(response => response.map(tx => new FlatTransaction(tx))),
    );
    this.selectTransactionCount$ = this.store.pipe(
      select(selectTransactionCount),
      tap(response => {
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
    ).pipe(
      delay(500), // this is required because it is taking some time to initialize this._filter, even if it is the first selector, line 46
      tap(response => {
        // console.log(this._filter);
        return this.store.dispatch(new TechnicalReferenceUpdated({filter: this._filter}));
      })).subscribe();
  }

  onFilterChange(filter: Filter) {
    this._filter = filter;
    this.store.dispatch(new FilterUpdated({filter: filter, pageData: this._pageData}));
  }

  onTransactionIDSelected(transactionID: string) {
    this.router.navigate(['transactions', transactionID]);
  }

  onPageChanged(pageData: PageData) {
    // console.log(pageData);
    this._pageData = pageData;
    this.store.dispatch(new FilterUpdated({filter: this._filter, pageData: this._pageData}));
  }
}
