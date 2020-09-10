import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudOperations } from './crud-operations';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

//A Generic CRUD Service, that can handle any object
export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

  constructor(
    //The Client
    protected _http: HttpClient,
    //The API URL
    protected _base: string
  ) { }

  //Post Object to API
  create(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  //Get Objects from API
  get(): Observable<T[]> {
    return this._http.get<T[]>(this._base);
  }

  //Get Object by ID from API
  getById(id: ID): Observable<T> {
    return this._http.get<T>(this._base + "/" + id);
  }

  //Update an Object by its ID
  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._base + "/" + id, t, {});
  }

  //Delete an Object by its ID
  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + "/" + id);
  }
}
