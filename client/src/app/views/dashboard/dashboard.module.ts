import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { ApplicationPipesModule } from '../../application-pipes.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NotifierModule } from 'angular-notifier';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    NotifierModule,
    ApplicationPipesModule,
    NgSelectModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
