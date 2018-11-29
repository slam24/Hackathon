import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DataService } from '../../services/data.service';
import * as c3 from 'c3';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: 'team.component.html'
})
export class TeamComponent implements OnInit {
  public repositories: object;
  public members: object;
  public columns: any[] = [];
  public graph = false;
  public repo: string;
  private first: number = 100;
  private last: number = null;
  private after: string = null;
  private before: string = null;
  private limit: number = 100;
  private pageInfo: object;

  constructor(private data: DataService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.data.getInfoqueryById('infoteam', this.route.snapshot.paramMap.get('slug'), environment.organization).subscribe(
        data => {
          this.repositories = data['organization']['team']['repositories']['edges']
          this.members = data['organization']['team']['members']['edges']
        }
      );
      this.before = null
      this.after = null
      this.last = null
      this.first = 100
      this.columns = []
      this.graph = false
    });
  }

  ngOnInit() {}

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
      if (this.before || this.after) {
        this.clear()
      }
      this.data.getGraph('getGraph', repo, this.first, this.last, this.after, this.before, environment.organization).subscribe(
        data => {
          if (data['repository']['ref'] != null) {
            var aux = []
            aux.push(repo)
            this.pageInfo =  data['repository']['ref']['target']['history']['pageInfo']
            data['repository']['ref']['target']['history']['edges'].forEach(commit => {
              aux.push(commit.node.additions)
            })

            aux.sort(function(a, b) {
              return parseFloat(String(b)) - parseFloat(String(a))
            });

            this.columns.push(aux)

            let chart = c3.generate({
              bindto: '#chart',
              data: {
                columns: this.columns 
              }
            });
          }
        }
      );
    }
  }

  previous(repo){
    this.before = this.pageInfo['startCursor']
    this.after = null
    this.last = this.limit
    this.first = null
    this.loadGraph(repo)
  }

  next(repo){
    this.after = this.pageInfo['endCursor']
    this.before = null
    this.last = null
    this.first = this.limit
    this.loadGraph(repo)
  }

  loadGraph(repo){
    this.data.getGraph('getGraph', repo, this.first, this.last, this.before, this.after, environment.organization).subscribe(
      data => {
        var aux = []
        this.columns = []
        aux.push(repo)
        this.pageInfo =  data['repository']['ref']['target']['history']['pageInfo']
        data['repository']['ref']['target']['history']['edges'].forEach(commit => {
          aux.push(commit.node.additions)
        })

        aux.sort(function(a, b) {
          return parseFloat(String(b)) - parseFloat(String(a))
        });

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

  clear(){
    this.before = null
    this.after = null
    this.last = null
    this.first = 100
    this.columns = []
    let chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: this.columns 
      }
    });
  }
}
