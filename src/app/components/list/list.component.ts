import { Component, OnInit, NgModule, HostBinding } from '@angular/core';
import { ClimateObj } from '../../models/climate-model';
import { ClimateService } from '../../services/climate.service';
import { PlantObj } from '../../models/plant-model'
import { PlantService } from '../../services/plant.service';
import { CrudService } from 'src/app/services/crud-service.service';
import { PlantTypesService } from 'src/app/services/plant-types.service';
import { PlantTypeObj } from 'src/app/models/plant-type-model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  constructor(
    /*
    private ClimateService: ClimateService, 
    private PlantService: PlantService,
    private plantTypeService: PlantTypesService
    */
  ) { }

  Objects: any[];

  ngOnInit(): void {
    /*
    this.getAllPlantTypes();
    */
  }

  /*
  getAllClimates() {
    this.ClimateService.get().subscribe(
      data => {
        this.Objects = <ClimateObj[]>data;
        console.log(this.Objects);
      },
      err => console.error(err),
      () => console.log("got climates")
    );
  }

  getAllPlants() {
    this.PlantService.get().subscribe(
      data => {
        this.Objects = <PlantObj[]>data;
        console.log(this.Objects);
      },
      err => console.error(err),
      () => console.log("got plants")
    );
  }

  getAllPlantTypes() {
    this.plantTypeService.get().subscribe(
      data => {
        this.Objects = <PlantTypeObj[]>data;
        console.log(this.Objects);
      },
      err => console.error(err),
      () => console.log("got plants types")
    );
  }
  //todo: Get x Items from API, when called again, get x Items
  //Example: Get 5 Items, then, get next 5 Items
  // 0 - 5, 5 - 10
  //GetNClimates(indexStart, Amount)
  //1st GetNClimates(0, 5)
  //2nd GetNClimates(5, 5)
*/

  reverseOrder() {}
}
