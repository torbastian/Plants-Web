import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EdibleObj } from '../../../models/edible-model';
import { load_up } from '../../../animations/load-up.animation';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EdibleService } from '../../../services/edible.service';

@Component({
  selector: 'app-edible-panel',
  templateUrl: './edible-panel.component.html',
  styleUrls: ['./edible-panel.component.css'],
  animations: [load_up]
})
export class EdiblePanelComponent implements OnInit {
  @ViewChild("edit") editElemet: ElementRef;
  /**
   * The edible panel is responsible for updating and creating edible values in the database
   */
  constructor(private EdibleService: EdibleService) { }

  EdibleFormChange = new FormGroup({
    EdibleName: new FormControl('', Validators.required)
  });

  EdibleAlter : EdibleObj = null;
  new_Edible : boolean = false;

  Edibles : EdibleObj[] = [];
  expandId : number = 0;

  ngOnInit(): void {
    this.getEdibles();
  }

  getEdibles() {
    /**
     * Get all Edible values
     */
    this.EdibleService.get().subscribe(
      data => {
        this.Edibles = <EdibleObj[]>data;
      },
      err => console.log(err)
    )
  }

  setExpand(id : number) {
    /**
     * Set the expand id and reset the form
     */
    if (id == 0 && this.new_Edible) {
      this.Edibles.pop();
      this.new_Edible = false;
    }
    this.EdibleFormChange.reset();
    this.expandId = id;

    setTimeout(() => {
      if (this.editElemet != undefined) {
        this.editElemet.nativeElement.focus();
      }
    }, 0)
  }

  updateEdible() {
    /**
     * If the edible value is new, create a new edible value instead
     */
    if (this.new_Edible) {
      this.newEdible();
      return;
    }

    /**
     * Update an edible value with the information provided in the form
     */
    let id = this.expandId;
    let _Edible = new EdibleObj();
    _Edible.id = id;
    _Edible.info = this.EdibleFormChange.value.EdibleName;

    this.EdibleService.update(id, _Edible).subscribe(
      data => {
        this.expandId = 0;
      },
      err => console.error(err),
      () => this.getEdibles()
    );
  }

  newEdible() {
    /**
     * Create a new climate object, and push it to the database
     */
    let _Edible = new EdibleObj();
    _Edible.info = this.EdibleFormChange.value.EdibleName;

    this.EdibleService.create(_Edible).subscribe(
      data => {
        this.expandId = 0;
        this.new_Edible = false;
      },
      err => console.error(err),
      () => this.getEdibles()
    );
  }

  addTempEdible() {
    /**
     * Add a temporary new container for a new edible value, and expand it (make it editable)
     */
    this.new_Edible = true;
    let _Edible = new EdibleObj();
    _Edible.id = this.Edibles[this.Edibles.length - 1].id + 1;
    _Edible.info = '';
    this.Edibles.push(_Edible);
    this.setExpand(_Edible.id);
  }
}
