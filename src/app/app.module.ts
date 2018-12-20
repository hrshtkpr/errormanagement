import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {MatDialogComponent} from './shared/components/mat-dialog/mat-dialog.component';
import {HeaderComponent} from './main/header/header.component';
import {BodyComponent} from './main/body/body.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    MatDialogComponent,
    HeaderComponent,
    BodyComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MatDialogComponent
  ]
})
export class AppModule {
}
