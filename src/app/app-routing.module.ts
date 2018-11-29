import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TransactionListComponent} from './transaction/transaction-list/transaction-list.component';
import {HomeComponent} from './home/home.component';
import {ReportComponent} from './dashboard/report/report.component';
import {NotificationComponent} from './configuration/notification/notification.component';
import {PersistenceComponent} from './configuration/persistence/persistence.component';
import {TransactionDetailComponent} from './transaction/transaction-detail/transaction-detail.component';

const routes: Routes = [
  { path: 'transaction', component: TransactionListComponent },
  { path: 'transaction/:TransactionID', component: TransactionDetailComponent },
  { path: 'dashboard', component: ReportComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'persistence', component: PersistenceComponent },
  { path: 'retry', component: TransactionListComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
