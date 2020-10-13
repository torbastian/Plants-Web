import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { PlantObj } from '../../models/plant-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  plant: PlantObj;

  constructor(private PlantService: PlantService) { }

  ngOnInit(): void {
    this.getLatestPlant();
  }

  getLatestPlant() {
    /* Get the latest plant entry in the database to display on the front page */
    this.PlantService.getLatest().subscribe(
      data => {
        this.plant = <PlantObj>data;
      },
      err => console.error(err)
    )
  }
}
