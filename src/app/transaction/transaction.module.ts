import {NgModule} from '@angular/core';
import {TransactionListComponent} from './transaction-list/transaction-list.component';
import {TransactionService} from './transaction.service';
import {TransactionDetailComponent} from './transaction-detail/transaction-detail.component';
import {TransactionRoutingModule} from './transaction-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromTransactionReducer from './transaction.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TransactionEffects} from './transaction.effects';

@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionDetailComponent
  ],
  imports: [
    TransactionRoutingModule,
    CommonModule,
    SharedModule,
    StoreModule.forFeature('transaction', fromTransactionReducer.transactionReducer),
    EffectsModule.forFeature([TransactionEffects])
  ],
  providers: [
    TransactionService
  ]
})
export class TransactionModule {
}
