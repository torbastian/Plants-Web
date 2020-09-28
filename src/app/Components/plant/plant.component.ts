import { Component, OnInit, Input } from '@angular/core';
import { PlantImageService, ImagePlant } from '../../services/plant.service';
import { PlantObj } from '../../models/plant-model';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})
export class PlantComponent implements OnInit {
  @Input() plant: PlantObj;

  constructor(
    protected PlantImageService: PlantImageService,
    private router: Router
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
        //Timeout used in testing to simulate longer load times
        setTimeout(() => {
          this.base64image = atob(pImage.image);
        }, 0);
      },
      err => console.error(err)
    );
  }

  gotoArticle() {
   this.router.navigate(['Article/' + this.plant.id]);
  }

  onLoad() {
    this.loading = false;
  }
}
