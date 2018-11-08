import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { DataService } from '../../services/data.service';
import { Organization } from '../../shared/models/organization.model';

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

  constructor(private data: DataService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {
    this.data.getInfoquery('infolayout').subscribe(
      data => {
        this.org = data['organization']
        data['organization']['teams']['edges'].forEach(team => {
          navItems.push({name:team.node.name,url:'/team/'+team.node.id,icon:'fa fa-users'})
        });
      }
    );
  }
}
