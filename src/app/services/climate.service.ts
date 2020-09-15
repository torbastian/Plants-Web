import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CrudService } from './crud-service.service'
import { ClimateObj } from '../models/climate-model';

//Singleton; This service is available throughout the site
@Injectable({
  providedIn: 'root'
})

//Extend the parent object, and access its functions (CRUD)
export class ClimateService extends CrudService<ClimateObj, number>{
  constructor(protected _http: HttpClient) {
    super(_http, 'https://localhost:44356/api/climates');
   }
}
