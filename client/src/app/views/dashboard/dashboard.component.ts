import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Organization } from '../../shared/models/organization.model';
import { NotifierService } from 'angular-notifier';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public teams = 0;
  public repositories = 0;
  public members = 0;
  public commits = 0;
  public lastcommits: any[] = [];
  public app: any;
  public commitsFB: any;
  private readonly notifier: NotifierService;

  constructor(private data: DataService, db: AngularFireDatabase, notifierService: NotifierService ) {
    this.notifier = notifierService;
    this.commitsFB  = db.list('commits');
    this.commitsFB.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        if (action.type == 'child_added') {
          console.log(action.key);
          console.log(action.payload.val());
          this.notifier.notify( 'warning', 'last commit' );
        }
      });
    });
  }

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
