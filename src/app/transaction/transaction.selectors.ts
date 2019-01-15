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

export const selectBusinessReferences = createSelector(
  selectTransactionState,
  transaction => transaction.businessReferences
);

export const selectService = createSelector(
  selectTransactionState,
  transaction => transaction.filter['Service']
/*  transaction => {
    const technicalFilter = {Service: transaction.filter['Service']};
    console.log(technicalFilter);
    return technicalFilter;
  }*/
  // (({ a, c }) => ({ a, c }))(object)
);

export const selectComponent = createSelector(
  selectTransactionState,
  transaction => transaction.filter['Component']
);

export const selectTechnicalDomain = createSelector(
  selectTransactionState,
  transaction => transaction.filter['TechnicalDomain']
);

export const selectBusinessDomain = createSelector(
  selectTransactionState,
  transaction => transaction.filter['BusinessDomain']
);

export const selectBusinessOperation = createSelector(
  selectTransactionState,
  transaction => transaction.filter['BusinessOperation']
);

export const selectBusinessConcept = createSelector(
  selectTransactionState,
  transaction => transaction.filter['BusinessConcept']
);
export const selectTransactionASMLEventListLoading = createSelector(
  selectTransactionState,
  transaction => transaction.transactionASMLEventListLoading
);

export const selectBusinessRefListLoading = createSelector(
  selectTransactionState,
  transaction => transaction.businessRefListLoading
);
