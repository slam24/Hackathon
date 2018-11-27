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
  public columns: any[] = [];
  public graph = false;
  public repo: string;
  private after: string = null;
  private before: string = null;
  private limit: number = 5;
  private pageInfo: object;

  constructor(private data: DataService, private route: ActivatedRoute,) {}

  ngOnInit() {
    this.data.getInfoqueryById('infoteam', this.route.snapshot.paramMap.get('slug')).subscribe(
      data => {
        this.repositories = data['organization']['team']['repositories']['edges']
        this.members = data['organization']['team']['members']['edges']
      }
    );
  }

  getGrahp(repo){
    this.repo = repo
    this.graph = true;
    var aux = true
    this.columns.forEach(graph => {
      if (graph[0] == repo) {
        aux = false
      }
    })

    if (aux) {
      this.data.getGraph('getGraph', repo, this.limit, this.after, this.before).subscribe(
        data => {
          var aux = []
          aux.push(repo)
          this.pageInfo =  data['repository']['ref']['target']['history']['pageInfo']
          data['repository']['ref']['target']['history']['edges'].forEach(commit => {
            aux.push(commit.node.additions)
          })

          this.columns.push(aux)

          let chart = c3.generate({
            bindto: '#chart',
            data: {
              columns: this.columns 
            }
          });
        }
      );
    }
  }

  previous(){

  }

  next(repo){
    this.after = this.pageInfo['endCursor']
    this.loadGraph(repo)
  }

  loadGraph(repo){
    this.data.getGraph('getGraph', repo, this.limit, this.before, this.after).subscribe(
      data => {
        var aux = []
        this.columns = []
        aux.push(repo)
        this.pageInfo =  data['repository']['ref']['target']['history']['pageInfo']
        data['repository']['ref']['target']['history']['edges'].forEach(commit => {
          aux.push(commit.node.additions)
        })

        this.columns.push(aux)

        let chart = c3.generate({
          bindto: '#chart',
          data: {
            columns: this.columns 
          }
        });
      }
    );
  }
}
