import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'team.component.html'
})
export class TeamComponent implements OnInit {

  constructor(private data: DataService, private route: ActivatedRoute,) {}

  ngOnInit() {
    this.data.getInfoqueryById('infoteam', this.route.snapshot.paramMap.get('slug')).subscribe(
      data => {
        console.log(data)
      }
    );
  }
}
