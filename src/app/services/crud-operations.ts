import { Observable } from 'rxjs';

//An interface for CRUD Services
export interface CrudOperations<T, ID> {
    create(t: T): Observable<T>;
    get(): Observable<T[]>;
    getById(id: ID): Observable<T>;
    update(id: ID, t: T): Observable<T>;
    delete(id: ID): Observable<any>;
}
