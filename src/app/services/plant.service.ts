import { Injectable } from '@angular/core';
import { CrudService } from './crud-service.service';
import { HttpClient } from '@angular/common/http';
import { PlantObj } from '../models/plant-model';
import {User} from "../models/user-model";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

//Singleton; This service is available throughout the site
@Injectable({
  providedIn: 'root'
})
export class PlantService extends CrudService<PlantObj, number> {
  constructor(protected _http: HttpClient) {
    super(_http, environment.apiUrl + '/plants');
   }

   getByClimateId(id: number): Observable <PlantObj[]> {
     return this._http.get<PlantObj[]>(this._base + '/climate/' + id);
   }

   getByTypeId(id: number): Observable <PlantObj[]> {
     return this._http.get<PlantObj[]>(this._base + '/type/' + id);
   }

   getLatest(): Observable <PlantObj> {
     return this._http.get<PlantObj>(this._base + '/latest');
   }

   getByUserId(id: number): Observable <PlantObj[]> {
     return this._http.get<PlantObj[]>(this._base + '/user/' + id);
   }

   getApproval(approvalType: number): Observable <PlantObj[]> {
     return this._http.get<PlantObj[]>(this._base + '/approval/' + approvalType);
   }

   setApproveType(id: number, approvalType: number) {
     return this._http.put(this._base + '/approval/' + id + '/' + approvalType, null);
   }

   create(plant: any): Observable<any>{
    return this._http.post(this._base, plant);
   }
   getOwner(PlantID: number):Observable<User>{
    return this._http.get<User>(this._base + "/owner/" + PlantID); 
   }
}

@Injectable({
  providedIn: 'root'
})
export class PlantImageService {

  constructor (private http: HttpClient) {}

  readonly _base: string = environment.apiUrl + '/plants/image';

  put(id: number, image64: ImagePlant) {
    return this.http.put<ImagePlant>(this._base + '/' + id, image64);
  }

  get(id: number) {
    return this.http.get<ImagePlant>(this._base + '/' + id);
  }
}

export class ImagePlant {
  id: number;
  image: string;
}
