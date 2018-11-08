import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DataService } from '../../services/data.service';
import { Organization } from '../../shared/models/organization.model';
import { Teams } from '../../shared/models/teams.model';

@Component({
  templateUrl: 'team.component.html'
})
export class TeamComponent implements OnInit {
  public org: Organization;
  public tms: Teams;

  constructor(private data: DataService, private route: ActivatedRoute,) {}

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.data.getInfoquery('infolayout').subscribe(
      data => {
        this.org = data['organization']
        this.tms = data['organization']['teams']['edges']
      }
    );
  }
}
