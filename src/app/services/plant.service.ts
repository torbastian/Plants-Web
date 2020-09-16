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

@Injectable({
  providedIn: 'root'
})
export class PlantImageService {

  constructor (private http: HttpClient) {}

  readonly _base: string = 'https://localhost:44356/api/plants/image';

  put(id: number, image64: ImagePlant) {
    return this.http.put<ImagePlant>(this._base + '/' + id, image64);
  }
}

export class ImagePlant {
  image: string;
}
