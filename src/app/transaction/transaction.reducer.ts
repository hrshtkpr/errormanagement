import {Filter} from '../shared/components/mat-filter/mat-filter.component';
import {TransactionActions, TransactionActionTypes} from './transaction.actions';
import {Transaction} from './transaction.model';


export interface TransactionState {
  filter: Filter;
  transactionListLoading: boolean;
  transactionList: Transaction[];
}

export const initialTransactionState: TransactionState = {
  filter: {},
  transactionListLoading: false,
  transactionList: []
};

export function transactionReducer(state = initialTransactionState, action: TransactionActions): TransactionState {
  switch (action.type) {
    case TransactionActionTypes.FilterUpdated:
      return {
        ...state,
        filter: action.payload.filter,
        transactionListLoading: true
      };
    case TransactionActionTypes.TransactionsLoaded:
      return {
        ...state,
        transactionList: action.payload.transactionList,
        transactionListLoading: false
      };
    default:
      return state;
  }
}
