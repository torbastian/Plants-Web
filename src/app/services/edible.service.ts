import { Injectable } from '@angular/core';
import { CrudService } from './crud-service.service';
import { PlantTypeObj } from '../models/plant-type-model';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

//Singleton; This service is available throughout the site
@Injectable({
  providedIn: 'root'
})
export class EdibleService extends CrudService<PlantTypeObj, number> {
  constructor(protected _http: HttpClient) {
    super(_http, environment.apiUrl + '/edible')
   }
}
