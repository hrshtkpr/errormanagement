import {NgModule} from '@angular/core';
import {TransactionListComponent} from './transaction-list/transaction-list.component';
import {TransactionFilterComponent} from './transaction-list/transaction-filter/transaction-filter.component';
import {TransactionService} from './transaction.service';
import {TransactionDetailComponent} from './transaction-detail/transaction-detail.component';
import {TransactionRoutingModule} from './transaction-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionFilterComponent,
    TransactionDetailComponent
  ],
  imports: [
    TransactionRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: [
    TransactionService
  ]
})
export class TransactionModule {
}
