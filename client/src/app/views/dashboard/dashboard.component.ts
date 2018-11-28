import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Organization } from '../../shared/models/organization.model';
import { Language } from '../../shared/models/language.model';
import { Store } from '@ngrx/store';

import { NotifierService } from 'angular-notifier';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface AppState {
  readonly blockchain: any[];
}

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public teams = 0;
  public repositories = 0;
  public members = 0;
  public commits = 0;
  public lastcommits: any[] = [];
  public languages: Language[] = [];
  public app: any;
  public commitsFB: any;
  private readonly notifier: NotifierService;
  private coins: Observable<any[]>;

  constructor(private data: DataService, db: AngularFireDatabase, notifierService: NotifierService, private store: Store<AppState> ) {
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

    this.coins = this.store.select(state => state.blockchain);
  }

  ngOnInit() {

    this.data.getInfoquery('infodashboard').subscribe(
      data => {
        var vm = this
        vm.teams = data['organization']['teams'].totalCount
        data['organization']['teams']['edges'].forEach(team => {
          vm.members += team.node.members.totalCount
          vm.repositories += team.node.repositories.totalCount
          team.node.repositories.edges.forEach(repository => {
             vm.commits += repository.node.ref.target.history.totalCount //<-
             vm.lastcommits.push(repository) //<-
             repository.node.languages.edges.forEach(language => {
               if (vm.languages.length > 0) {
                 if (vm.languages.find(s => s.id === language.node.id)) {
                   let aux = vm.languages.find(s => s.id === language.node.id)
                   let index = vm.languages.indexOf(aux);
 
                   vm.languages[index].count++
                 }else{
                   language.node.count = 1
                   vm.languages.push(language.node)
                 }
               }else{
                   language.node.count = 1
                   vm.languages.push(language.node)
               }
             });
          });
        });
        vm.languages.sort(function(a, b) {
          return parseFloat(String(b.count)) - parseFloat(String(a.count))
        });
      }
    );
  }
}
