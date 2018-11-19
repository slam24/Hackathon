import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { TeamComponent } from './team.component';
import { TeamRoutingModule } from './team-routing.module';
import { ApplicationPipesModule } from '../../application-pipes.module';

@NgModule({
  imports: [
    FormsModule,
    TeamRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    ApplicationPipesModule
  ],
  declarations: [ TeamComponent ]
})
export class TeamModule { }
