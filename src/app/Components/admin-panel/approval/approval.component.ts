import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../../services/plant.service';
import { ApprovedTypesService } from '../../../services/approved-types.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { PlantObj } from 'src/app/models/plant-model';
import { ApprovedObj } from 'src/app/models/approved-model';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'],
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
export class ApprovalComponent implements OnInit {

  constructor(
    private ApprovedTypesService: ApprovedTypesService,
    private PlantService: PlantService,
    private route: ActivatedRoute
  ) { }

  approvedTypes: ApprovedObj[] = [];
  plants: PlantObj[] = [];
  currentTypeId: number = null;
  currentType: string = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentTypeId = <number>params["id"];
      if (this.currentTypeId == null || this.currentTypeId == 1)
        this.currentTypeId = 2;
      
      this.getPlantsByApprovedType(this.currentTypeId);
    })

    this.getApprovedTypes();
  }

  getApprovedTypes() {
    this.ApprovedTypesService.get().subscribe(
      data => {
        this.approvedTypes = <ApprovedObj[]>data;
      },
      err => console.error(err),
      () => this.setCurrentType()
    );
  }

  setCurrentType() {
    if (this.approvedTypes != []) {
      let aObj = this.approvedTypes.find(a => a.id == this.currentTypeId);
      if (aObj != undefined) {
        this.currentType = aObj.info;
      }
    }
  }

  getPlantsByApprovedType(approvalType: number) {
    this.currentTypeId = approvalType;
    this.PlantService.getApproval(approvalType).subscribe(
      data => {
        this.plants = <PlantObj[]>data;
      },
      err => console.error(err),
      () => this.setCurrentType()
    );
  }

  setApproval(id: number, approvalType: number) {
    this.PlantService.setApproveType(id, approvalType).subscribe(
      data => {

      },
      err => console.error(err),
      () => this.getPlantsByApprovedType(this.currentTypeId)
    )
  }
}
