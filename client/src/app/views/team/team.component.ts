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
  public repositories: object;
  public members: object;
  public graph: object;

  constructor(private data: DataService, private route: ActivatedRoute,) {}

  ngOnInit() {
    this.data.getInfoqueryById('infoteam', this.route.snapshot.paramMap.get('slug')).subscribe(
      data => {
        this.repositories = data['organization']['team']['repositories']['edges']
        this.members = data['organization']['team']['members']['edges']
      }
    );
  }

  ngAfterViewInit() {

  }

  getGrahp(repo){
    console.log(repo)
    this.data.getGraph('getGraph', 20, null, null).subscribe(
      data => {
        var aux = []
        aux.push(repo)
        data['repository']['ref']['target']['history']['edges'].forEach(commit => {
          aux.push(commit.node.additions)
        })

        let chart = c3.generate({
        bindto: '#chart',
            data: {
                columns: [
                    ['data1', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    aux
                ]
            }
        });
      }
    );
  }
}
