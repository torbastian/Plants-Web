import { Component, OnInit, Input } from '@angular/core';
import { ClimateObj } from '../../models/climate-model';
import { ClimateService } from '../../services/climate.service';
import { PlantObj } from '../../models/plant-model'
import { PlantService } from '../../services/plant.service';
import { PlantTypesService } from 'src/app/services/plant-types.service';
import { PlantTypeObj } from 'src/app/models/plant-type-model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { load_up } from '../../animations/load-up.animation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [load_up]
})
export class ListComponent implements OnInit {
  @Input() listType?: string;

  constructor(
    private ClimateService: ClimateService,
    private PlantService: PlantService,
    private PlantTypesService: PlantTypesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  Objects: any[] = [];
  reverse: boolean = false;
  filter: string;
  filterID: number;
  dropDownHidden: boolean = true;

  filterInfo: any[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.listType = paramMap.get('type');
      this.filter = paramMap.get('filter');
      this.filterID = parseInt(paramMap.get('id'));
      this.getList();
    });
  }

  getList() {
    this.dropDownHidden = true;

    if (this.Objects.length > 0) {
      this.Objects = [];
      this.reverse = false;
    }

    if (this.filter == null) {
      //If no filter is specified, get by listytype
      switch (this.listType) {
        case 'climates':
          this.getAllClimates();
          break;

        case 'plants':
          this.getAllPlants();
          break;

        case 'types':
          this.getAllPlantTypes();
          break;

        default:
          this.getAllPlants();
          this.listType = 'plants';
          break;
      }
    }
    else {
      //If filter is specified, get plants filter & filterID
      switch (this.filter) {
        case 'climates':
          this.getPlantsByClimate(this.filterID);
          if (this.filterInfo.length == 0)
            this.getAllClimates(true);
          else
            this.changeFilterInfo();
          break;

        case 'types':
          this.getPlantsByType(this.filterID);
          if (this.filterInfo.length == 0)
            this.getAllPlantTypes(true);
          else
            this.changeFilterInfo();
          break;

        default:
          this.getAllPlants();
          break;
      }
    }
  }

  getAllClimates(onlyFilter: boolean = false) {
    //Få fat i alle clima, gem dem i filterinfo,
    //Hvis onlyFitler er false, gem dem i objects
    this.ClimateService.get().subscribe(
      data => {
        let objects = <ClimateObj[]>data;

        this.filterInfo = objects;

        if (!onlyFilter) {
          //This is done so that filterInfo and 
          //Objects dont point to the same data
          this.Objects = [...objects];
        }
      },
      err => console.error(err),
      () => this.changeFilterInfo()
    );
  }

  getAllPlantTypes(onlyFilter: boolean = false) {
    //Få fat i alle plante typer, gem dem i filterinfo,
    //Hvis onlyFitler er false, gem dem i objects
    this.PlantTypesService.get().subscribe(
      data => {
        let objects = <PlantTypeObj[]>data;

        this.filterInfo = objects;

        if (!onlyFilter) {
          //This is done so that filterInfo and 
          //Objects dont point to the same data
          this.Objects = [...objects];
        }
      },
      err => console.error(err),
      () => this.changeFilterInfo()
    );
  }

  getAllPlants() {
    this.PlantService.get().subscribe(
      data => {
        this.Objects = <PlantObj[]>data;
      },
      err => console.error(err)
    );
  }

  getPlantsByType(id: number) {
    this.PlantService.getByTypeId(id).subscribe(
      data => {
        this.Objects = <PlantObj[]>data;
      },
      err => console.error(err)
    );
  }

  getPlantsByClimate(id: number) {
    this.PlantService.getByClimateId(id).subscribe(
      data => {
        this.Objects = <PlantObj[]>data;
      },
      err => console.error(err)
    );
  }

  changeFilterInfo() {
    //Get the item with maching id of filterID and put it on the first index
    let x = this.filterInfo.findIndex(e => e.id == this.filterID);
    let item = this.filterInfo.splice(x, 1)[0];
    this.filterInfo.unshift(item);
    this.sortFilterInfo();
  }

  sortFilterInfo() {
    //Store the first item of the array, sort the rest then put it back
    let firstItem = this.filterInfo.shift();
    this.filterInfo.sort((a, b) => a.info.localeCompare(b.info));
    this.filterInfo.unshift(firstItem);
  }

  //todo: Get x Items from API, when called again, get x Items
  //Example: Get 5 Items, then, get next 5 Items
  // 0 - 5, 5 - 10
  //GetNClimates(indexStart, Amount)
  //1st GetNClimates(0, 5)
  //2nd GetNClimates(5, 5)

  reverseOrder() {
    this.Objects = this.Objects.reverse();
    this.reverse = !this.reverse;
  }

  goBack() {
    this.location.back();
  }
}
