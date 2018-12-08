import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFlatTreeComponent } from './components/mat-flat-tree/mat-flat-tree.component';
import {SummaryPipe} from './pipes/summary-pipe';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';

@NgModule({
  declarations: [MatFlatTreeComponent, SummaryPipe, MatDialogComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
