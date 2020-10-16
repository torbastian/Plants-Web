import { Component, OnInit } from '@angular/core';
import { ClimateService } from '../../services/climate.service';
import { ClimateObj } from '../../models/climate-model';

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.css']
})

export class ClimateComponent implements OnInit {
  //As far as i know this is unused, but initially used as a test of the API connection
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
      },
      err => console.error(err),
      () => console.log("got Climates")
    );
  }

  getObject(id: number) {
    this.ClimateService.getById(id).subscribe(
      data => {
        this.object = <ClimateObj>data;
      },
      err => console.error(err),
      () => console.log("Got Climate")
    );
  }

  delete(id: number) {
    this.ClimateService.delete(id).subscribe(
      data => {
      },
      err => console.error(err),
      () => console.log("Deleted Climate")
    );
  }

  put(Obj: ClimateObj) {
    this.ClimateService.update(Obj.id, Obj).subscribe(
      data => {
      },
      err => console.error(err),
      () => console.log("Updated Climate")
    );
  }

  post(Obj: ClimateObj) {
    this.ClimateService.create(Obj).subscribe(
      data => {
      },
      err => console.error(err),
      () => console.log("Created new Climate")
    );
  }
}
