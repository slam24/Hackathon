import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Organization } from '../../shared/models/organization.model';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public teams = 0;
  public repositories = 0;
  public members = 0;
  public commits = 0;
  public lastcommits: any[] = [];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getInfoquery('infodashboard').subscribe(
      data => {
        var vm = this
        this.teams = data['organization']['teams'].totalCount
        data['organization']['teams']['edges'].forEach(team => {
          vm.members = this.members + team.node.members.totalCount
          vm.repositories = this.repositories + team.node.repositories.totalCount
          team.node.repositories.edges.forEach(repository => {
             vm.commits = vm.commits + repository.node.ref.target.history.totalCount
             vm.lastcommits.push(repository)
          });
        });
      }
    );
  }
}
