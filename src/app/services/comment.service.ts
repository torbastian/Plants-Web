import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud-service.service';
import { CommentObj } from '../models/comment-model';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

//Singleton; This service is available throughout the site
@Injectable({
  providedIn: 'root'
})

//Extend the parent object, and access its functions (CRUD)
export class CommentService extends CrudService<CommentObj, number>{
  constructor(protected _http: HttpClient) {
    super(_http, environment.apiUrl + '/comments');
   }

   getByArticleId(id: number): Observable<CommentObj[]> {
      return this._http.get<CommentObj[]>(this._base + '/' + id);
   }

   get() {
     //Override, this is not implimented to work with the controller
     return null;
   }
}
