import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Organization } from '../../shared/models/organization.model';
import { Language } from '../../shared/models/language.model';
import { Store } from '@ngrx/store';
import * as c3 from 'c3';
import { environment } from '../../../environments/environment';

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
  public selectedSimpleItem: any;
  //graph
  public columns: any[] = [];
  private first: number = 100;
  private last: number = null;
  private after: string = null;
  private before: string = null;
  private limit: number = 100;
  private pageInfo: object;

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

  }

  ngOnInit() {
    this.coins = this.store.select(state => state.blockchain);

    this.data.getInfoquery('infodashboard', environment.organization).subscribe(
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

  loadGraph(){
    if (this.selectedSimpleItem) {
      var show = true
      this.columns.forEach(graph => {
        if (graph[0] == this.selectedSimpleItem.split(" ")[1]) {
          show = false
        }
      })

      if (show) {
        this.data.getGraph('getGraph', this.selectedSimpleItem.split(" ")[1], this.first, this.last, this.after, this.before, environment.organization).subscribe(
          data => {
            if (data['repository']['ref'] != null) {
              var aux = []
              aux.push(this.selectedSimpleItem.split(" ")[1])
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
