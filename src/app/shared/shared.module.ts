import {NgModule} from '@angular/core';
import {MatFlatTreeComponent} from './components/mat-flat-tree/mat-flat-tree.component';
import {SummaryPipe} from './pipes/summary-pipe';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatSelectModule,
  MatSidenavModule, MatSlideToggleModule,
  MatTableModule, MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import {MglTimelineModule} from 'angular-mgl-timeline';
import {CdkTableModule} from '@angular/cdk/table';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {XmlPipe} from './pipes/xml-pipe';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    MatFlatTreeComponent,
    SummaryPipe,
    XmlPipe],
  imports: [
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MglTimelineModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    CdkTableModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  exports: [
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MglTimelineModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    CdkTableModule,
    FormsModule,
    HttpClientModule,
    XmlPipe,
    SummaryPipe,
    MatFlatTreeComponent,
    FlexLayoutModule
  ]
})
export class SharedModule {
}
