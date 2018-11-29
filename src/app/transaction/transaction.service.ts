import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Filter} from './transaction-list/transaction-filter/transaction-filter.component';

import {observable, Observable} from 'rxjs';
import {FlatLog, Logs} from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private readonly httpClient: HttpClient ) { }

/*  getTransactions(filter: Filter)  {
    const url = 'http://localhost:9095/loggings';
    return this.httpClient.get(url, {params: {...filter}});
  }*/

  getTransactions(filter: Filter): Observable<FlatLog> {
    return Observable.create(observer => {

      // observable execution
      observer.next({FlatLogs: [{Event: 'Event1', ID: 'ID1', JobKey: 'JobKey1',
        BusinessConcept: 'BusinessConcept1', BusinessDomain: 'BusinessDomain1', BusinessOperation: 'BusinessOperation1',
        ComponentName: 'ComponentName1', DateTime: 'DateTime1', HostName: 'HostName1',
        ServiceName: 'ServiceName1', TechnicalDomain: 'TechnicalDomain1',
        TransactionID: 'TransactionID1'},
        {Event: 'Event2', ID: 'ID2', JobKey: 'JobKey2',
          BusinessConcept: 'BusinessConcept2', BusinessDomain: 'BusinessDomain2', BusinessOperation: 'BusinessOperation2',
          ComponentName: 'ComponentName2', DateTime: 'DateTime2', HostName: 'HostName2',
          ServiceName: 'ServiceName2', TechnicalDomain: 'TechnicalDomain2',
          TransactionID: 'TransactionID2'}]});
      observer.complete();
    });
  }

}
