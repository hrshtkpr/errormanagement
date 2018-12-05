import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Filter} from './transaction-list/transaction-filter/transaction-filter.component';

import {observable, Observable} from 'rxjs';
import {BusinessRef, Transaction} from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private readonly httpClient: HttpClient ) { }

/*  getTransactions(filter: Filter)  {
    const url = 'http://localhost:9095/loggings';
    return this.httpClient.get(url, {params: {...filter}});
  }*/

  getTransactions(filter: Filter): Observable<Transaction> {
    return Observable.create(observer => {
      const obj = {};
      const obj1 = {};
      const obj2 = {};

      obj['Status'] = 'Done';
      obj['TransactionID'] = 'TxID' + Date.now();
      obj['StartDateTime'] = 'StartDateTime' + Date.now();
      obj1['Name'] = 'BusRef1N' + Date.now();
      obj1['Value'] = 'BusRef1N' + Date.now();
      obj2['Name'] = 'BusRef2N' + Date.now();
      obj2['Value'] = 'BusRef2N' + Date.now();
      obj['BusinessRefs'] = {};
      obj['BusinessRefs']['BusinessRef'] = [];
      obj['BusinessRefs']['BusinessRef'].push(obj1);
      obj['BusinessRefs']['BusinessRef'].push(obj2);

      observer.next({Transactions: {Transaction: [
          obj,
          {TransactionID: 'TransactionID2', Status: 'Pending', StartDateTime: 'StartDateTime2', EndDateTime: 'EndDateTime2',
            BusinessRefs: { BusinessRef: [{Name: 'BusinessRef4', Value: 'BusinessRef4Value'},
                {Name: 'BusinessRef5', Value: 'BusinessRef5Value'}, {Name: 'BusinessRef6', Value: 'BusinessRef6Value'}] } },
          {TransactionID: 'TransactionID3', Status: 'Error', StartDateTime: 'StartDateTime2', EndDateTime: 'EndDateTime2',
            BusinessRefs: { BusinessRef: [{Name: 'BusinessRef4', Value: 'BusinessRef4Value'},
                {Name: 'BusinessRef5', Value: 'BusinessRef5Value'}, {Name: 'BusinessRef6', Value: 'BusinessRef6Value'}] } },
          {TransactionID: 'TransactionID3', Status: 'Error', StartDateTime: 'StartDateTime2', EndDateTime: 'EndDateTime2',
            BusinessRefs: { BusinessRef: [{Name: 'BusinessRef4', Value: 'BusinessRef4Value'},
                {Name: 'BusinessRef5', Value: 'BusinessRef5Value'}, {Name: 'BusinessRef6', Value: 'BusinessRef6Value'}] } },
          {TransactionID: 'TransactionID3', Status: 'Error', StartDateTime: 'StartDateTime2', EndDateTime: 'EndDateTime2',
            BusinessRefs: { BusinessRef: [{Name: 'BusinessRef4', Value: 'BusinessRef4Value'},
                {Name: 'BusinessRef5', Value: 'BusinessRef5Value'}, {Name: 'BusinessRef6', Value: 'BusinessRef6Value'}] } },
          {TransactionID: 'TransactionID3', Status: 'Error', StartDateTime: 'StartDateTime2', EndDateTime: 'EndDateTime2',
            BusinessRefs: { BusinessRef: [{Name: 'BusinessRef4', Value: 'BusinessRef4Value'},
                {Name: 'BusinessRef5', Value: 'BusinessRef5Value'}, {Name: 'BusinessRef6', Value: 'BusinessRef6Value'}] } },
          {TransactionID: 'TransactionID3', Status: 'Error', StartDateTime: 'StartDateTime2', EndDateTime: 'EndDateTime2',
            BusinessRefs: { BusinessRef: [{Name: 'BusinessRef4', Value: 'BusinessRef4Value'},
                {Name: 'BusinessRef5', Value: 'BusinessRef5Value'}, {Name: 'BusinessRef6', Value: 'BusinessRef6Value'}] } },
          {TransactionID: 'TransactionID3', Status: 'Error', StartDateTime: 'StartDateTime2', EndDateTime: 'EndDateTime2',
            BusinessRefs: { BusinessRef: [{Name: 'BusinessRef4', Value: 'BusinessRef4Value'},
                {Name: 'BusinessRef5', Value: 'BusinessRef5Value'}, {Name: 'BusinessRef6', Value: 'BusinessRef6Value'}] } },
          {TransactionID: 'TransactionID3', Status: 'Error', StartDateTime: 'StartDateTime2', EndDateTime: 'EndDateTime2',
            BusinessRefs: { BusinessRef: [{Name: 'BusinessRef4', Value: 'BusinessRef4Value'},
                {Name: 'BusinessRef5', Value: 'BusinessRef5Value'}, {Name: 'BusinessRef6', Value: 'BusinessRef6Value'}] } },
          {TransactionID: 'TransactionID3', Status: 'Error', StartDateTime: 'StartDateTime2', EndDateTime: 'EndDateTime2',
            BusinessRefs: { BusinessRef: [{Name: 'BusinessRef4', Value: 'BusinessRef4Value'}] } }
        ]}});
      observer.complete();
    });
  }

  getEvents(filter: Filter): Observable<Event> {
    return Observable.create(observer => {
      observer.next( { Events : {Event: [{EventStatus: 'EventStart', ID: 'ID1', JobKey: 'JobKey1',
          Context: { BusinessConcept: 'BusinessConcept1', BusinessDomain: 'BusinessDomain1', BusinessOperation: 'BusinessOperation1',
          ComponentName: 'ComponentName1', DateTime: 'DateTime1', HostName: 'HostName1',
          ServiceName: 'ServiceName1', TechnicalDomain: 'TechnicalDomain1',
          TransactionID: 'TransactionID1', Timestamp: '1234567'}, EventType: 'L'},
          {EventStatus: 'EventStart', ID: 'ID2', JobKey: 'JobKey2',
            Context: { BusinessConcept: 'BusinessConcept2', BusinessDomain: 'BusinessDomain2', BusinessOperation: 'BusinessOperation2',
            ComponentName: 'ComponentName2', DateTime: 'DateTime2', HostName: 'HostName2',
            ServiceName: 'ServiceName2', TechnicalDomain: 'TechnicalDomain2',
            TransactionID: 'TransactionID1', Timestamp: '1234987', BusinessRefs: { BusinessRef: [
              {Name: 'BusinessRef1', Value: 'BusinessRef1Value'}, {Name: 'BusinessRef2', Value: 'BusinessRef2Value'}] }},
            EventType: 'L' },
          {EventStatus: 'EventErr', ID: 'ID2', JobKey: 'JobKey2',
            Context: { BusinessConcept: 'BusinessConcept2', BusinessDomain: 'BusinessDomain2', BusinessOperation: 'BusinessOperation2',
            ComponentName: 'ComponentName2', DateTime: 'DateTime2', HostName: 'HostName2',
            ServiceName: 'ServiceName2', TechnicalDomain: 'TechnicalDomain2',
            TransactionID: 'TransactionID1', Timestamp: '1244987'}, EventType: 'E',
            ExceptionDetail: { Code: 'BW-GENERIC-999', Category: 'Functional'}},
          {EventStatus: 'EventEnd', ID: 'ID1', JobKey: 'JobKey1',
            Context: { BusinessConcept: 'BusinessConcept1', BusinessDomain: 'BusinessDomain1', BusinessOperation: 'BusinessOperation1',
            ComponentName: 'ComponentName1', DateTime: 'DateTime1', HostName: 'HostName1',
            ServiceName: 'ServiceName1', TechnicalDomain: 'TechnicalDomain1',
            TransactionID: 'TransactionID1', Timestamp: '1244567'}, EventType: 'L'}]   }  } );
      observer.complete();
    });
  }

  getEvent(ID: string, EventType: string): Observable<Event> {
    console.log(ID);
    console.log(EventType);
    if (EventType === 'E') {
      return Observable.create(observer => {
        observer.next({ Event: {EventStatus: 'EventErr', ID: 'ID2', JobKey: 'JobKey2',
          Context: { BusinessConcept: 'BusinessConcept2', BusinessDomain: 'BusinessDomain2', BusinessOperation: 'BusinessOperation2',
            ComponentName: 'ComponentName2', DateTime: 'DateTime2', HostName: 'HostName2',
            ServiceName: 'ServiceName2', TechnicalDomain: 'TechnicalDomain2',
            TransactionID: 'TransactionID1', Timestamp: '1244987', TransactionData: 'TDe'}, EventType: 'E',
          ExceptionDetail: { Code: 'BW-GENERIC-999', Category: 'Functional', DumpAnalysis: 'DA'}}  });
        observer.complete();
      });
    } else {
      return Observable.create(observer => {
        observer.next({ Event: {EventStatus: 'EventStart', ID: 'ID1', JobKey: 'JobKey1',
          Context: { BusinessConcept: 'BusinessConcept1', BusinessDomain: 'BusinessDomain1', BusinessOperation: 'BusinessOperation1',
            ComponentName: 'ComponentName1', DateTime: 'DateTime1', HostName: 'HostName1',
            ServiceName: 'ServiceName1', TechnicalDomain: 'TechnicalDomain1',
            TransactionID: 'TransactionID1', Timestamp: '1234567', TransactionData: 'TDl'}, EventType: 'L'}});
        observer.complete();
      });
    }
  }

 getBusinessRefs(filter: Filter): Observable<BusinessRef> {
    return Observable.create(observer => {

      // observable execution
      observer.next({BusinessRefs: [{Name: 'XXXXX' + Date.now()}, {Name: 'YYYYYY' + Date.now()}]});
      observer.complete();
    });
  }
}
