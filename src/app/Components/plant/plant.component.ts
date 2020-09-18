import { Component, OnInit, Input } from '@angular/core';
import { PlantService, PlantImageService, ImagePlant } from '../../services/plant.service';
import { PlantObj } from '../../models/plant-model';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})
export class PlantComponent implements OnInit {
  @Input() plant: PlantObj;

  constructor(
    protected plantService: PlantService,
    protected PlantImageService: PlantImageService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getImage(this.plant.id);
  }

  base64image: SafeUrl;
  loading: boolean = true;

  //Get Image from database by the ID 
  getImage(id: number) {
    
    this.PlantImageService.get(id).subscribe(
      data => {
        let pImage = <ImagePlant>data;
        this.base64image = atob(pImage.image);
      },
      err => console.error(err)
    );
  }

  onLoad() {
    this.loading = false;
  }
}
