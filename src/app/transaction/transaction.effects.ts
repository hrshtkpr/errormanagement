import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {TransactionService} from './transaction.service';
import {FilterUpdated, TransactionActionTypes, TransactionsLoaded} from './transaction.actions';
import {filter, map, switchMap, tap} from 'rxjs/operators';


@Injectable()
export class TransactionEffects {

  @Effect()
  loadTransactions$ = this.actions$.pipe(
    ofType<FilterUpdated>(TransactionActionTypes.FilterUpdated),
    switchMap(action => this.transactionService.getTransactions(action.payload.filter)),
    map(response => (response['Transactions'] && response['Transactions']['Transaction']) ?
      (new TransactionsLoaded({transactionList: response['Transactions']['Transaction']})) :
      (new TransactionsLoaded({transactionList: []}))
    )
  );

  constructor(private actions$: Actions, private transactionService: TransactionService) {
  }
}
