import {Filter} from '../shared/components/mat-filter/mat-filter.component';
import {TransactionActions, TransactionActionTypes} from './transaction.actions';
import {EventASML, Transaction} from './transaction.model';


export interface TransactionState {
  filter: Filter;
  pageData: {pageIndex: string, pageSize: string, startPosition: string};
  transactionListLoading: boolean;
  transactionList: Transaction[];
  transactionsCount: number;
  transactionID: string;
  transactionASMLEventList: EventASML[];
  eventID: string;
  eventType: string;
  eventASML: EventASML;
}

export const initialTransactionState: TransactionState = {
  filter: {},
  pageData: null,
  transactionListLoading: false,
  transactionList: [],
  transactionsCount: 0,
  transactionID: '',
  transactionASMLEventList: [],
  eventID: '',
  eventType: '',
  eventASML: null,
};

export function transactionReducer(state = initialTransactionState, action: TransactionActions): TransactionState {
  switch (action.type) {
    case TransactionActionTypes.FilterUpdated:
      return {
        ...state,
        filter: action.payload.filter,
        pageData: action.payload.pageData,
        transactionListLoading: true
      };
    case TransactionActionTypes.TransactionsLoaded:
      return {
        ...state,
        transactionList: action.payload.transactionList,
        transactionsCount: action.payload.transactionsCount,
        transactionListLoading: false
      };
    case TransactionActionTypes.TransactionSelected:
      return {
        ...state,
        transactionID: action.payload.transactionID
      };
    case TransactionActionTypes.TransactionLoaded:
      return {
        ...state,
        transactionASMLEventList: action.payload.transactionASMLEventList
      };
    case TransactionActionTypes.EventSelected:
      return {
        ...state,
        eventID: action.payload.eventID,
        eventType: action.payload.eventType
      };
    case TransactionActionTypes.EventLoaded:
      const idx = state.transactionASMLEventList.findIndex(transactionASMLEvent => transactionASMLEvent.ID === action.payload.eventASML.ID);
      const tempTransactionASMLEventList = state.transactionASMLEventList.slice(0, idx);
      const tempTransactionASMLEvent = state.transactionASMLEventList[idx];
      if (action.payload.eventASML.Context !== null) {
        tempTransactionASMLEvent.Context = {...action.payload.eventASML.Context};
        tempTransactionASMLEventList.push(tempTransactionASMLEvent);
      }
      tempTransactionASMLEventList.push(... state.transactionASMLEventList.slice(idx + 1));
      return {
        ...state,
        transactionASMLEventList: tempTransactionASMLEventList,
        eventASML: action.payload.eventASML
      };
    default:
      return state;
  }
}
