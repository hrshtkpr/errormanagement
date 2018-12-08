import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatTableModule } from '@angular/material/table';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { TransactionFilterComponent } from './transaction/transaction-list/transaction-filter/transaction-filter.component';
import { HomeComponent } from './home/home.component';

import {MatIconModule} from '@angular/material/icon';

import {MatSidenavModule} from '@angular/material/sidenav';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule, MatNativeDateModule,
  MatOptionModule, MatPaginatorModule, MatProgressBarModule,
  MatSelectModule, MatSlideToggleModule, MatToolbar,
  MatTreeModule
} from '@angular/material';
import {MatFlatTreeComponent} from './shared/components/mat-flat-tree/mat-flat-tree.component';
import {ReportComponent} from './dashboard/report/report.component';
import {NotificationComponent} from './configuration/notification/notification.component';
import {PersistenceComponent} from './configuration/persistence/persistence.component';
import {ConfigurationModule} from './configuration/configuration.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {CommonModule} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HttpClientModule} from '@angular/common/http';
import {TransactionDetailComponent} from './transaction/transaction-detail/transaction-detail.component';
import { MglTimelineModule } from 'angular-mgl-timeline';
import {CdkTableModule} from '@angular/cdk/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SummaryPipe} from './shared/pipes/summary-pipe';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialogComponent} from './shared/components/mat-dialog/mat-dialog.component';
import {XmlPipe} from './shared/pipes/xml-pipe';

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    TransactionFilterComponent,
    TransactionDetailComponent,
    HomeComponent,
    MatFlatTreeComponent,
    SummaryPipe,
    MatDialogComponent,
    XmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatTreeModule,
    MatButtonModule,
    ConfigurationModule,
    DashboardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MglTimelineModule,
    CdkTableModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MatDialogComponent
  ]
})
export class AppModule { }
