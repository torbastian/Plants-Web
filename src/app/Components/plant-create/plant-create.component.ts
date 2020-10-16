import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PlantImageService, ImagePlant } from "../../services/plant.service";
import { AccountService } from "../../services/account.service";
import { ClimateObj } from "../../models/climate-model";
import { ClimateService } from "../../services/climate.service";
import { EdibleObj } from "../../models/edible-model";
import { EdibleService } from "../../services/edible.service";
import { PlantTypeObj } from "../../models/plant-type-model";
import { PlantTypesService } from "../../services/plant-types.service";
import { PlantObj } from 'src/app/models/plant-model';
import {PlantService} from "../../services/plant.service";

@Component({
  selector: 'app-plant-create',
  templateUrl: './plant-create.component.html',
  styleUrls: ['./plant-create.component.css']
})
export class PlantCreateComponent implements OnInit {
  PlantForm = new FormGroup({
    Navn: new FormControl("", Validators.required),
    Image: new FormControl("", Validators.required),
    Type: new FormControl("", Validators.required),
    Climate: new FormControl("", Validators.required),
    Edible: new FormControl("", Validators.required)
  });
  constructor(
    private PlantService: PlantService,
    private plantImageService: PlantImageService,
    private AccountService: AccountService,
    private edibleService: EdibleService,
    private climateService: ClimateService,
    private plantTypeService: PlantTypesService
  ) { }

  ngOnInit(): void {
    this.getEdible();
    this.getClimate();
    this.getPlantType();
    this.UserID = this.AccountService.userValue.id;
  }
  //VARIABLES
  UserID: number = 0;
  url = null;
  base64image = null;

  EdibleArray: EdibleObj[] = [];
  ClimateArray: ClimateObj[] = [];
  PlantTypeArray: PlantTypeObj[] = [];

  getEdible() {
    this.edibleService.get().subscribe(
      data => {
        this.EdibleArray = <EdibleObj[]>data;
      }, err => console.error(err),
      ()=> this.PlantForm.value.Edible = this.EdibleArray[0]
    );
  }

  getClimate() {
    this.climateService.get().subscribe(
      data => {
        this.ClimateArray = <ClimateObj[]>data;
      }, err => console.error(err),
      ()=> this.PlantForm.value.Climate = this.ClimateArray[0]
    );
  }

  getPlantType() {
    this.plantTypeService.get().subscribe(
      data => {
        this.PlantTypeArray = <PlantTypeObj[]>data;
      }, err => console.error(err),
      ()=> this.PlantForm.value.Type = this.PlantTypeArray[0]
    );
  }
  //When the file is changed on the site
  onFileChanged(event) {
    //Check if there is a file
    if (event.target.files && event.target.files[0]) {
      //Construct new file reader to load file
      var reader = new FileReader();
      let file = event.target.files[0];

      //Read the data as Base64
      reader.readAsDataURL(file);

      //When the reader is finished, set url to the image, 
      //so that it is displayed, and set base64image to
      //a pure Base64 encoding of the image
      reader.onload = (event) => {
        this.url = reader.result;
        console.log(this.url);
        this.base64image = btoa(this.url);
      }
    }
  }
  post(){
    if(this.UserID == 0){
      return;
    }
    let _Values = this.PlantForm.value;
    let _plant: any = {
      FK_PlantTypeID: _Values.Type.id,
      PlantName: _Values.Navn,
      FK_ClimateID: _Values.Climate.id,
      FK_UserID: this.UserID,
      FK_EdibleID: _Values.Edible.id,
      //FK_ApprovedTypeID:
      Image: this.base64image
    };
    this.PlantService.create(_plant).subscribe(
      data => {
      }, err => console.error(err))
  }
  debug(){
    console.log(this.PlantForm.value);
  }

}
