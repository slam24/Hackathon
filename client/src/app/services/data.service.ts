import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../shared/models/organization.model'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getInfoquery(query, organization) {
    return this.http.get(environment.baseURL+'/'+query, {params: {
      organization: organization
    }})
  }

  getInfoCommiters(query, repos, organization) {
    return this.http.get<Organization>(environment.baseURL+'/'+query, {params: {
      repos: repos,
      organization: organization
    }})
  }

  getInfoqueryById(query, slug, organization) {
    return this.http.get<Organization>(environment.baseURL+'/'+query, {params: {
      slug: slug,
      organization: organization
    }})
  }

  getGraph(query, repo, first, last, before, after, organization){
    return this.http.get<Organization>(environment.baseURL+'/'+query, {params: {
      repo: repo,
      first: first,
      last: last,
      before: before,
      after: after,
      organization: organization
    }})
  }
}
