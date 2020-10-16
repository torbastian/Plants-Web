import { Injectable } from '@angular/core';
import { CrudService } from './crud-service.service';
import { HttpClient } from '@angular/common/http';
import { ApprovedObj } from '../models/approved-model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovedTypesService extends CrudService<ApprovedObj, number> {
  constructor(protected _http: HttpClient) {
    super(_http, environment.apiUrl + '/approvedtypes');
   }
}
