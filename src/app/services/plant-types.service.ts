import { Injectable } from '@angular/core';
import { CrudService } from './crud-service.service';
import { PlantTypeObj } from '../models/plant-type-model';
import { HttpClient } from '@angular/common/http';

//Singleton; This service is available throughout the site
@Injectable({
  providedIn: 'root'
})
export class PlantTypesService extends CrudService<PlantTypeObj, number> {
  constructor(protected _http: HttpClient) {
    super(_http, 'https://localhost:44356/api/planttypes')
   }
}
