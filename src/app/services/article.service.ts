import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud-service.service';
import { ArticleObj } from '../models/article-model';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

//Singleton; This service is available throughout the site
@Injectable({
  providedIn: 'root'
})

//Extend the parent object, and access its functions (CRUD)
export class ArticleService extends CrudService<ArticleObj, number> {
  constructor(protected _http: HttpClient) {
    super(_http, environment.apiUrl + '/articles');
   }

   getByPlantID(id: number): Observable<ArticleObj> {
    return this._http.get<ArticleObj>(this._base + '/plant/' + id);
  }

  create(article: any): Observable<any>{
    return this._http.post(this._base, article);
   }
}
