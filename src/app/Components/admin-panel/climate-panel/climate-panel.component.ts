import { Component, OnInit } from '@angular/core';
import { ClimateService } from '../../../services/climate.service';
import { ClimateObj } from '../../../models/climate-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { load_up } from '../../../animations/load-up.animation';

@Component({
  selector: 'app-climate-panel',
  templateUrl: './climate-panel.component.html',
  styleUrls: ['./climate-panel.component.css'],
  animations: [load_up]
})
export class ClimatePanelComponent implements OnInit {

  constructor(private ClimateService: ClimateService) { }

  ClimateFormChange = new FormGroup({
    ClimateName: new FormControl('', Validators.required)
  });

  ClimateAlter : ClimateObj = null;
  new_climate : boolean = false;

  Climates : ClimateObj[] = []
  expandId : number = 0;

  ngOnInit(): void {
    this.getClimates();
  }

  getClimates() {
    this.ClimateService.get().subscribe(
      data => {
        this.Climates = <ClimateObj[]>data;
      },
      err => console.log(err)
    )
  }

  setExpand(id : number) {
    if (id == 0 && this.new_climate) {
      this.Climates.pop();
      this.new_climate = false;
    }
    this.ClimateFormChange.reset();
    this.expandId = id;
  }

  updateClimate() {
    if (this.new_climate) {
      this.newClimate();
      return;
    }

    let id = this.expandId;
    let _climate = new ClimateObj();
    _climate.id = id;
    _climate.info = this.ClimateFormChange.value.ClimateName;

    this.ClimateService.update(id, _climate).subscribe(
      data => {
        this.expandId = 0;
      },
      err => console.error(err),
      () => this.getClimates()
    );
  }

  newClimate() {
    let _climate = new ClimateObj();
    _climate.info = this.ClimateFormChange.value.ClimateName;

    this.ClimateService.create(_climate).subscribe(
      data => {
        this.expandId = 0;
        this.new_climate = false;
      },
      err => console.error(err),
      () => this.getClimates()
    )
  }

  addTempClimate() {
    this.new_climate = true;
    let _climate = new ClimateObj();
    _climate.id = this.Climates[this.Climates.length - 1].id + 1;
    _climate.info = '';
    this.Climates.push(_climate);
    this.setExpand(_climate.id);
  }
}
