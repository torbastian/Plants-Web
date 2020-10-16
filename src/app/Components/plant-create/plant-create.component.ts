import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PlantImageService, ImagePlant } from "../../services/plant.service";

@Component({
  selector: 'app-plant-create',
  templateUrl: './plant-create.component.html',
  styleUrls: ['./plant-create.component.css']
})
export class PlantCreateComponent implements OnInit {
  PlantForm = new FormGroup({
    PlantID: new FormControl(1, Validators.required),
    Image: new FormControl("", Validators.required)
  });
  constructor(
    private plantImageService: PlantImageService
  ) { }

  ngOnInit(): void {
  }

}
