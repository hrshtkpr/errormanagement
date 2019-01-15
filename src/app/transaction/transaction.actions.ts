import {Action} from '@ngrx/store';
import {Filter} from '../shared/components/mat-filter/mat-filter.component';
import {BusinessRef, EventASML, PageData, Transaction} from './transaction.model';

export enum TransactionActionTypes {
  FilterUpdated = '[Transaction List Page] Filter Updated',
  TransactionsLoaded = '[Transaction API] Transactions Loaded',
  TransactionSelected = '[Transaction List Page] Transaction Selected',
  TransactionLoaded = '[Transaction API] Transaction Loaded',
  EventSelected = '[Transaction Detail Page] Event Selected',
  EventLoaded = '[Transaction Detail Page] Event Loaded',
  BusinessReferencesLoaded = '[Transaction API] Business References Loaded',
  TechnicalReferenceUpdated = '[Transaction List Page] Technical Reference Updated In Filter'
}

export class FilterUpdated implements Action {
  readonly type = TransactionActionTypes.FilterUpdated;

  constructor(public payload: { filter: Filter, pageData: PageData }) {

  }
}

export class TransactionsLoaded implements Action {
  readonly type = TransactionActionTypes.TransactionsLoaded;

  constructor(public payload: { transactionList: Transaction[], transactionsCount: number }) {

  }
}

export class TransactionSelected implements Action {
  readonly type = TransactionActionTypes.TransactionSelected;

  constructor(public payload: { transactionID: string }) {

  }
}

export class TransactionLoaded implements Action {
  readonly type = TransactionActionTypes.TransactionLoaded;

  constructor(public payload: { transactionASMLEventList: EventASML[] }) {

  }
}

export class EventSelected implements Action {
  readonly type = TransactionActionTypes.EventSelected;

  constructor(public payload: { eventID: string, eventType: string }) {

  }
}

export class EventLoaded implements Action {
  readonly type = TransactionActionTypes.EventLoaded;

  constructor(public payload: { eventASML: EventASML }) {

  }
}

export class BusinessReferencesLoaded implements Action {
  readonly type = TransactionActionTypes.BusinessReferencesLoaded ;

  constructor(public payload: { businessReferences: BusinessRef[]}) {

  }
}

export class TechnicalReferenceUpdated implements Action {
  readonly type = TransactionActionTypes.TechnicalReferenceUpdated;

  constructor(public payload: { filter: Filter}) {

  }
}

export type TransactionActions = FilterUpdated |
  TransactionsLoaded |
  TransactionSelected |
  TransactionLoaded |
  EventSelected |
  EventLoaded |
  BusinessReferencesLoaded |
  TechnicalReferenceUpdated;
