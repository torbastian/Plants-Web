import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild("edit") editElemet: ElementRef;
  /**
   * The type panel is responsible for updating and creating types in the database
   */
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
    /**
     * Get all types
     */
    this.TypeService.get().subscribe(
      data => {
        this.Types = <PlantTypeObj[]>data;
      },
      err => console.log(err)
    )
  }

  setExpand(id : number) {
    /**
     * Set the expand id and reset the form
     */
    if (id == 0 && this.new_type) {
      this.Types.pop();
      this.new_type = false;
    }
    this.TypeFormChange.reset();
    this.expandId = id;

    //Give the above code time to take effect
    setTimeout(() => {
      if (this.editElemet != undefined) {
        this.editElemet.nativeElement.focus();
      }
    }, 0)
  }

  updateType() {
    /**
     * If the type is new, create a new type instead
     */
    if (this.new_type) {
      this.newType();
      return;
    }

    /**
     * Update a type with the information provided in the form
     */
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
    /**
     * Create a new type object, and push it to the database
     */
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
    /**
     * Add a temporary new container for a new type, and expand it (make it editable)
     */
    this.new_type = true;
    let _type = new PlantTypeObj();
    _type.id = this.Types[this.Types.length - 1].id + 1;
    _type.info = '';
    this.Types.push(_type);
    this.setExpand(_type.id);
  }
}
