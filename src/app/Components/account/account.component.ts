import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { PlantService } from '../../services/plant.service';
import { PlantObj } from '../../models/plant-model';
import { User } from '../../models/user-model';
import { Router } from '@angular/router';
import { load_up } from '../../animations/load-up.animation';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  animations: [load_up]
})
export class AccountComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private plantService: PlantService,
    private router: Router) { }

  currentUser: User = null;
  plants: PlantObj[] = [];

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let _user = this.accountService.userValue;
    if (_user != null || _user != undefined) {
      this.currentUser = _user;
      this.getPlantsBelongingToUser();
    }
    else {
      this.router.navigate(['Account/Login']);
    }
  }

  getPlantsBelongingToUser() {
    if (this.currentUser != null) {
      this.plantService.getByUserId(this.currentUser.id).subscribe(
        data => {
          this.plants = <PlantObj[]>data;
          this.plants = this.plants.reverse();
        }, err => console.log(err)
      );
    }
  }

}
