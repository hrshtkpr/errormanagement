import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TransactionListComponent} from './transaction/transaction-list/transaction-list.component';
import {ReportComponent} from './dashboard/report/report.component';
import {NotificationComponent} from './configuration/notification/notification.component';
import {PersistenceComponent} from './configuration/persistence/persistence.component';

const routes: Routes = [
  {path: 'transaction', loadChildren: './transaction/transaction.module#TransactionModule'},
  // {path: 'dashboard', component: ReportComponent},
  // {path: 'notification', component: NotificationComponent},
  // {path: 'persistence', component: PersistenceComponent},
  // {path: 'retry', component: TransactionListComponent},
  {path: '**', redirectTo: 'transaction', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
