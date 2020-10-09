import { Component, OnInit } from '@angular/core';
import { PlantTypesService} from '../../../services/plant-types.service';
import { PlantTypeObj } from '../../../models/plant-type-model';
import { load_up } from '../../../animations/load-up.animation';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-type-panel',
  templateUrl: './type-panel.component.html',
  styleUrls: ['./type-panel.component.css'],
  animations: [load_up]
})
export class TypePanelComponent implements OnInit {

  constructor(private TypeService: PlantTypesService) { }

  TypeFormChange = new FormGroup({
    TypeName: new FormControl('', Validators.required)
  });

  TypeAlter : PlantTypeObj = null;
  new_type : boolean = false;

  Types : PlantTypeObj[] = [];
  expandId : number = 0;

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes() {
    this.TypeService.get().subscribe(
      data => {
        this.Types = <PlantTypeObj[]>data;
      },
      err => console.log(err)
    )
  }

  setExpand(id : number) {
    if (id == 0 && this.new_type) {
      this.Types.pop();
      this.new_type = false;
    }
    this.TypeFormChange.reset();
    this.expandId = id;
  }

  updateType() {
    if (this.new_type) {
      this.newType();
      return;
    }

    let id = this.expandId;
    let _type = new PlantTypeObj();
    _type.id = id;
    _type.info = this.TypeFormChange.value.TypeName;

    this.TypeService.update(id, _type).subscribe(
      data => {
        this.expandId = 0;
      },
      err => console.error(err),
      () => this.getTypes()
    );
  }

  newType() {
    let _type = new PlantTypeObj();
    _type.info = this.TypeFormChange.value.TypeName;

    this.TypeService.create(_type).subscribe(
      data => {
        this.expandId = 0;
        this.new_type = false;
      },
      err => console.error(err),
      () => this.getTypes()
    );
  }

  addTempType() {
    this.new_type = true;
    let _type = new PlantTypeObj();
    _type.id = this.Types[this.Types.length - 1].id + 1;
    _type.info = '';
    this.Types.push(_type);
    this.setExpand(_type.id);
  }
}
