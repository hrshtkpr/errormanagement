import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TransactionState} from './transaction.reducer';

export const selectTransactionState = createFeatureSelector<TransactionState>('transaction');

export const selectTransactionList = createSelector(
  selectTransactionState,
  transaction => transaction.transactionList
);

export const selectTransactionListLoading = createSelector(
  selectTransactionState,
  transaction => transaction.transactionListLoading
);
