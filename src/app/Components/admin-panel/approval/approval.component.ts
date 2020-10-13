import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../../services/plant.service';
import { ApprovedTypesService } from '../../../services/approved-types.service';
import { PlantObj } from 'src/app/models/plant-model';
import { ApprovedObj } from 'src/app/models/approved-model';
import { load_up } from '../../../animations/load-up.animation';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'],
  animations: [load_up]
})
export class ApprovalComponent implements OnInit {
  /**
   * The approval panel is where the admin approves and denies incoming plants 
   * and their articles
   */
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
    /* Get the router paramater, which contains the id, 
    and get all plants based on their approved type
    if the ID is 1, make it 2, 1 is an already approved plant */
    this.route.params.subscribe(params => {
      this.currentTypeId = <number>params["id"];
      if (this.currentTypeId == null || this.currentTypeId == 1) {
        this.currentTypeId = 2;
      }
      this.plants = [];

      this.getPlantsByApprovedType(this.currentTypeId);
    })

    this.getApprovedTypes();
  }

  getApprovedTypes() {
    /* Get all approved types */
    this.ApprovedTypesService.get().subscribe(
      data => {
        this.approvedTypes = <ApprovedObj[]>data;
      },
      err => console.error(err),
      () => this.setCurrentType()
    );
  }

  setCurrentType() {
    /* Set the current approved type if found */
    if (this.approvedTypes != []) {
      let aObj = this.approvedTypes.find(a => a.id == this.currentTypeId);
      if (aObj != undefined) {
        this.currentType = aObj.info;
      }
    }
  }

  getPlantsByApprovedType(approvalType: number) {
    /* Get plans from the database based on their approval type */
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
    /* Set the approval type for a plant */
    this.PlantService.setApproveType(id, approvalType).subscribe(
      data => {

      },
      err => console.error(err),
      () => this.getPlantsByApprovedType(this.currentTypeId)
    )
  }

  delete(id : number) {
    /* Delete a plant based on ID */
    this.PlantService.delete(id).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err),
      () => this.getPlantsByApprovedType(this.currentTypeId)
    )
  }
}
