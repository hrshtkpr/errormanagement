import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Filter} from '../shared/components/mat-filter/mat-filter.component';

import {observable, Observable} from 'rxjs';
import {BusinessRef, Transaction} from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private readonly httpClient: HttpClient ) { }

  getTransactions(filter: Filter, payLoad: {pageIndex: string, pageSize: string, startPosition: string} )  {
    const url = 'http://localhost:10526/transactions';
    const  params = {
      ...filter,
       StartPosition: payLoad.startPosition,
       NumberOfItems: payLoad.pageSize
     };
    return this.httpClient.get(url, {params: params});
  }

  getEvents(filter: Filter)  {
    const url = 'http://localhost:10526/events';
    return this.httpClient.get(url, {params: {...filter}});
  }

  getEvent(ID: string, filter: Filter) {
    const url = 'http://localhost:10526/events/' + ID;
    return this.httpClient.get(url, {params: {...filter}});
  }

  getBusinessReferences(filter: Filter )  {
    const url = 'http://localhost:10526/businessrefs';
    const  params = {
      ...filter
    };
    return this.httpClient.get(url, {params: params});
  }
}
