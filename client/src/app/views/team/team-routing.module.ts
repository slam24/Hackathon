import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { TeamComponent } from './team.component';

const routes: Routes = [
  {
    path: ':id',
    component: TeamComponent,
    data: {
      title: 'Team'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule {}
