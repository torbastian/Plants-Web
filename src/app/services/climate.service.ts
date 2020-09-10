import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CrudService } from './crud-service.service'

@Injectable({
  providedIn: 'root'
})

//Extend the parent object, and access its functions (CRUD)
export class ClimateService extends CrudService<Climate, number>{
  constructor(protected _http: HttpClient) {
    super(_http, 'https://localhost:44356/api/climates');
   }
}

//The Object
export class Climate {
  public id: number;
  public climate: string;
}
