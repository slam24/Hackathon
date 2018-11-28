import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../shared/models/organization.model'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getInfoquery(query) {
    return this.http.get(environment.baseURL+'/'+query)
  }

  getInfoqueryById(query, slug) {
    return this.http.get<Organization>(environment.baseURL+'/'+query, {params: {
      slug: slug
    }})
  }

  getGraph(query, repo, first, last, before, after){
    return this.http.get<Organization>(environment.baseURL+'/'+query, {params: {
      repo: repo,
      first: first,
      last: last,
      before: before,
      after: after
    }})
  }
}
