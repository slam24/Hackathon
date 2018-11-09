import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Organization } from '../../shared/models/organization.model';
/*import firebase from '@firebase/app';
//import database from '@firebase/database';
require("@firebase/database");*/

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


  constructor(private data: DataService, db: AngularFireDatabase) {
    /*this.app = firebase.initializeApp({
        apiKey: "AIzaSyBKJD3-qsDYxuHm7PB73zyiI73T_Z95mw4",
        authDomain: "hackathon2018-8ee72.firebaseapp.com",
        databaseURL: "https://hackathon2018-8ee72.firebaseio.com",
        projectId: "hackathon2018-8ee72",
        storageBucket: "hackathon2018-8ee72.appspot.com",
        messagingSenderId: "676134022628"
    });*/

    this.commitsFB  = db.list('commits');
    this.commitsFB.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        if (action.type == 'child_added') {
          console.log(action.key);
          console.log(action.payload.val());
        }
      });
    });

  }

  ngOnInit() {
    /*var ref = this.app.database().ref('commits');
    console.log(ref)
    ref.on('child_added', function(snap){
      console.log(snap)
    });

    ref.on('child_changed', function(data) {
      console.log(data)
    });

    ref.on('child_removed', function(data) {
      console.log(data)
    });*/

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
