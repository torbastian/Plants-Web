import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private UserSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.UserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.UserSubject.asObservable();
  }

  public get userValue(): User {
    return this.UserSubject.value;
  }

  login(username, password) {
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, {username, password})
    .pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.UserSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('user');
    this.UserSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(id, params) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params)
    .pipe(map(x => {
      //Update stored user, if the current user updated their own information
      if (id == this.userValue.id) {
      
        //Update local storage
        const user = { ...this.userValue, ...params };  
        localStorage.setItem('user', JSON.stringify(user));
        
        //Publish updated user to subscribers
        this.UserSubject.next(user);
      }
    }))
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
    .pipe(map(x => {
      if (id == this.userValue.id) {
        this.logout();
      }
      return x;
    }));
  }
}
