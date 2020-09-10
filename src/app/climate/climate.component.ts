import { Component, OnInit } from '@angular/core';
import { Climate, ClimateService } from '../services/climate.service';

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.css'],
  providers: [ClimateService]
})
export class ClimateComponent implements OnInit {

  constructor(private ClimateService: ClimateService) { }

  objects: Climate[];

  ngOnInit(): void {
    this.getObjects();
  }

  getObjects() {
    this.ClimateService.get().subscribe(
      data => {
        this.objects = <Climate[]>data;
        console.log(data);
      },
      err => console.error(err),
      () => console.log("got Climates")
    );
  }

}
