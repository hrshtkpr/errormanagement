import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Filter} from '../shared/components/mat-filter/mat-filter.component';
import {catchError, map} from 'rxjs/operators';

import {of} from 'rxjs';
import {environment} from '../../environments/environment';
import {PageData} from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getTransactions(filter: Filter, payLoad: PageData) {
    const url = environment.url + '/transactions';
    const params = {
      ...filter,
      StartPosition: payLoad.startPosition.toString(),
      NumberOfItems: payLoad.pageSize.toString()
    };
    return this.httpClient.get(url, {params: params}).pipe(
      map((result) => {
        return result;
      }),
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        return of({});
      })
    );
    // return this.httpClient.get(url, {params: params});
  }

  getEvents(filter: Filter) {
    const url = environment.url + '/events';
    return this.httpClient.get(url, {params: {...filter}}).pipe(
      map((result) => {
        return result;
      }),
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        return of({});
      })
    );
    // return this.httpClient.get(url, {params: {...filter}});
  }

  getEvent(ID: string, filter: Filter) {
    const url = environment.url + '/events/' + ID;
    return this.httpClient.get(url, {params: {...filter}}).pipe(
      map((result) => {
        return result;
      }),
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        return of({});
      })
    );
    // return this.httpClient.get(url, {params: {...filter}});
  }

  getBusinessReferences(filter: Filter) {
    const url = environment.url + '/businessrefs';
    const params = {
      ...filter
    };
    return this.httpClient.get(url, {params: params}).pipe(
      map((result) => {
        return result;
      }),
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        return of({});
      })
    );
    // return this.httpClient.get(url, {params: params});
  }
}
