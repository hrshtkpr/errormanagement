import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionFilterComponent } from './transaction-list/transaction-filter/transaction-filter.component';
import {TransactionService} from './transaction.service';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';


@NgModule({
  declarations: [TransactionListComponent, TransactionFilterComponent, TransactionDetailComponent],
  imports: [
    CommonModule
  ],
  providers: [
    TransactionService
  ]
})
export class TransactionModule { }
