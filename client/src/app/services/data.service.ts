import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../shared/models/organization.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseURL = 'http://localhost:3000';
  private githubAPI = 'https://api.github.com/repos';
  constructor(private http: HttpClient) { }

  getInfoquery(query) {
    return this.http.get<Organization>(this.baseURL+'/'+query)
  }

  getInfoqueryById(query, slug) {
    return this.http.get<Organization>(this.baseURL+'/'+query, {params: {
      slug: slug
    }})
  }

  getDataGithub(query) {
    return this.http.get<Organization>(this.githubAPI+'/'+query)
  }
}
