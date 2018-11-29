import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { DataService } from '../../services/data.service';
import { Organization } from '../../shared/models/organization.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

export interface AppState {
  readonly blockchain: any[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public org: Organization;
  public bestCommitters: object;
  private coins: Observable<any[]>;

  constructor(private data: DataService, private store: Store<AppState>) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

  }

  ngOnInit() {
    this.coins = this.store.select(state => state.blockchain);

    this.data.getInfoquery('infolayout').subscribe(
      data => {
        this.org = data['organization']
        var aux = []
        data['organization']['teams']['edges'].forEach(team => {

          team.node.repositories.edges.forEach(repo =>{
            aux.push({'repo':team.node.name+' '+repo.node.name})
          })
          navItems.push({name:team.node.name,url:'/team/'+team.node.slug,icon:'fa fa-users'})
        });

        this.store.dispatch({
          type: 'ADD_COIN',
          payload: <any> aux
        });
      }
    );
  }

  getCommitters(){
    this.data.getInfoquery('getMostCommiter').subscribe(
      data => {
        this.bestCommitters = data;
      }
    );
  }
}
