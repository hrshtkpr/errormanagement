import {Filter} from '../shared/components/mat-filter/mat-filter.component';
import {TransactionActions, TransactionActionTypes} from './transaction.actions';
import {BusinessRef, EventASML, PageData, Transaction} from './transaction.model';


export interface TransactionState {
  filter: Filter;
  pageData: PageData;
  transactionListLoading: boolean;
  transactionList: Transaction[];
  transactionsCount: number;
  transactionID: string;
  transactionASMLEventList: EventASML[];
  eventID: string;
  eventType: string;
  eventASML: EventASML;
  businessReferences: BusinessRef[];
  transactionASMLEventListLoading: boolean;
  businessRefListLoading: boolean;
}

export const initialTransactionState: TransactionState = {
  filter: {},
  pageData: new PageData(0, 5, 0),
  transactionListLoading: false,
  transactionList: [],
  transactionsCount: 0,
  transactionID: '',
  transactionASMLEventList: [],
  eventID: '',
  eventType: '',
  eventASML: null,
  businessReferences: null,
  transactionASMLEventListLoading: false,
  businessRefListLoading: false
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
        transactionID: action.payload.transactionID,
        transactionASMLEventListLoading: true
      };
    case TransactionActionTypes.TransactionLoaded:
      return {
        ...state,
        transactionASMLEventList: action.payload.transactionASMLEventList,
        transactionASMLEventListLoading: false
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
    case TransactionActionTypes.BusinessReferencesLoaded:
      return {
        ...state,
        businessReferences: action.payload.businessReferences,
        businessRefListLoading: false
      };
    case TransactionActionTypes.TechnicalReferenceUpdated:
      return {
        ...state,
        businessRefListLoading: true
      };
    default:
      return state;
  }
}
