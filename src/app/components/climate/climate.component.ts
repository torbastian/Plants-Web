import { Component, OnInit } from '@angular/core';
import { ClimateService } from '../../services/climate.service';
import { ClimateObj } from '../../models/climate-model';
import { ComponentOperations } from '../component-service-interface';

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.css']
})

export class ClimateComponent implements OnInit, ComponentOperations {

  constructor(private ClimateService: ClimateService) { }

  objects: ClimateObj[];
  object: ClimateObj;

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.ClimateService.get().subscribe(
      data => {
        this.objects = <ClimateObj[]>data;
        console.log(data);
      },
      err => console.error(err),
      () => console.log("got Climates")
    );
  }

  getObject(id: number) {
    this.ClimateService.getById(id).subscribe(
      data => {
        this.object = <ClimateObj>data;
        console.log(data);
      },
      err => console.error(err),
      () => console.log("Got Climate")
    );
  }

  delete(id: number) {
    this.ClimateService.delete(id).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err),
      () => console.log("Deleted Climate")
    );
  }

  put(Obj: ClimateObj) {
    this.ClimateService.update(Obj.id, Obj).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err),
      () => console.log("Updated Climate")
    );
  }

  post(Obj: ClimateObj) {
    this.ClimateService.create(Obj).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err),
      () => console.log("Created new Climate")
    );
  }
}
