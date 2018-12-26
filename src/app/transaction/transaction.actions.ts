import { Action } from '@ngrx/store';
import {Filter} from '../shared/components/mat-filter/mat-filter.component';
import {Transaction} from './transaction.model';

export enum TransactionActionTypes {
  FilterUpdated = '[Transaction List Page] Filter Updated',
  TransactionsLoaded = '[Transaction API] Transactions Loaded'
}

export class FilterUpdated implements Action {
  readonly type = TransactionActionTypes.FilterUpdated;
  constructor(public payload: {filter: Filter} ) {

  }
}

export class TransactionsLoaded implements Action {
  readonly type = TransactionActionTypes.TransactionsLoaded;
  constructor(public payload: {transactionList: Transaction[]} ) {

  }
}

export type TransactionActions = FilterUpdated | TransactionsLoaded;
