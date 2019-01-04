import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TransactionState} from './transaction.reducer';

export const selectTransactionState = createFeatureSelector<TransactionState>('transaction');

export const selectTransactionList = createSelector(
  selectTransactionState,
  transaction => transaction.transactionList
);

export const selectTransactionCount = createSelector(
  selectTransactionState,
  transaction => transaction.transactionsCount
);

export const selectTransactionListLoading = createSelector(
  selectTransactionState,
  transaction => transaction.transactionListLoading
);

export const selectTransactionASMLEventList = createSelector(
  selectTransactionState,
  transaction => transaction.transactionASMLEventList
);

export const selectASMLEvent = createSelector(
  selectTransactionState,
  transaction => transaction.eventASML
);

export const selectFilter = createSelector(
  selectTransactionState,
  transaction => transaction.filter
);
