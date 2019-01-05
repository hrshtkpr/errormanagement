import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {TransactionService} from './transaction.service';
import {
  BusinessReferencesLoaded,
  EventLoaded,
  EventSelected,
  FilterUpdated, TechnicalReferenceUpdated,
  TransactionActionTypes,
  TransactionLoaded,
  TransactionSelected,
  TransactionsLoaded
} from './transaction.actions';
import {map, switchMap, tap} from 'rxjs/operators';


@Injectable()
export class TransactionEffects {

  @Effect()
  loadTransactions$ = this.actions$.pipe(
    ofType<FilterUpdated>(TransactionActionTypes.FilterUpdated),
    switchMap(action => this.transactionService.getTransactions(action.payload.filter, action.payload.pageData)),
    map(response => (response['Transactions'] && response['Transactions']['Transaction']) ?
      (new TransactionsLoaded({transactionList: response['Transactions']['Transaction'], transactionsCount: response['TotalCount']})) :
      (new TransactionsLoaded({transactionList: [], transactionsCount: 0 }))
    )
  );

  @Effect()
  loadBusinessReferences$ = this.actions$.pipe(
    ofType<FilterUpdated>(TransactionActionTypes.TechnicalReferenceUpdated),
    switchMap(action => this.transactionService.getBusinessReferences(action.payload.filter)),
    map(response => (response['BusinessRefs'] && response['BusinessRefs']['BusinessRef']) ?
      (new BusinessReferencesLoaded({businessReferences: response['BusinessRefs']['BusinessRef']})) :
      (new BusinessReferencesLoaded({businessReferences: []}))
    )
  );

  @Effect()
  loadTransaction$ = this.actions$.pipe(
    ofType<TransactionSelected>(TransactionActionTypes.TransactionSelected),
    switchMap(action => this.transactionService.getEvents({TransactionID: action.payload.transactionID})),
    map(response => (response['Events'] && response['Events']['Event']) ?
      (new TransactionLoaded({transactionASMLEventList: response['Events']['Event']})) :
      (new TransactionLoaded({transactionASMLEventList: []}))
    )
  );

  @Effect()
  loadEvent$ = this.actions$.pipe(
    ofType<EventSelected>(TransactionActionTypes.EventSelected),
    switchMap(action => this.transactionService.getEvent(action.payload.eventID, {Type: action.payload.eventType})),
    map(response => (response['Event']) ?
      (new EventLoaded({eventASML: response['Event']})) :
      (new EventLoaded({eventASML: null}))
    )
  );

  constructor(private actions$: Actions, private transactionService: TransactionService) {
  }
}
