import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersistenceComponent } from './persistence/persistence.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [PersistenceComponent, NotificationComponent],
  imports: [
    CommonModule
  ]
})
export class ConfigurationModule { }
