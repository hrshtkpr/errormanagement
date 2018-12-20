import {RouterModule, Routes} from '@angular/router';
import {TransactionListComponent} from './transaction-list/transaction-list.component';
import {TransactionDetailComponent} from './transaction-detail/transaction-detail.component';
import {ReportComponent} from '../dashboard/report/report.component';
import {NotificationComponent} from '../configuration/notification/notification.component';
import {PersistenceComponent} from '../configuration/persistence/persistence.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: '', component: TransactionListComponent},
  {path: ':TransactionID', component: TransactionDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule {
}
