import { Injectable } from '@angular/core';
import { CrudService } from './crud-service.service';
import { HttpClient } from '@angular/common/http';
import { PlantObj } from '../models/plant-model'

//Singleton; This service is available throughout the site
@Injectable({
  providedIn: 'root'
})

export class PlantService extends CrudService<PlantObj, number> {
  constructor(protected _http: HttpClient) {
    super(_http, 'https://localhost:44356/api/plants');
   }
}
