import { Component, OnInit, Input } from '@angular/core';
import { ClimateObj } from '../../models/climate-model';
import { ClimateService } from '../../services/climate.service';
import { PlantObj } from '../../models/plant-model'
import { PlantService } from '../../services/plant.service';
import { PlantTypesService } from 'src/app/services/plant-types.service';
import { PlantTypeObj } from 'src/app/models/plant-type-model';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(90, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ListComponent implements OnInit {
  @Input() listType?: string;

  constructor(
    private ClimateService: ClimateService,
    private PlantService: PlantService,
    private PlantTypesService: PlantTypesService,
    private route: ActivatedRoute
  ) { }

  Objects: any[] = [];
  reverse: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.listType = paramMap.get('type');
      this.getList();
    });
  }

  getList() {
    if (this.Objects.length > 0) {
      this.Objects = [];
      this.reverse = false;
    }

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

  getAllClimates() {
    this.ClimateService.get().subscribe(
      data => {
        this.Objects = <ClimateObj[]>data;
      },
      err => console.error(err)
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

  getAllPlantTypes() {
    this.PlantTypesService.get().subscribe(
      data => {
        this.Objects = <PlantTypeObj[]>data;
      },
      err => console.error(err)
    );
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
}
