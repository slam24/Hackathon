import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DataService } from '../../services/data.service';
import * as c3 from 'c3';

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

ngAfterViewInit() {
    let chart = c3.generate({
    bindto: '#chart',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ]
        }
    });
}
}
