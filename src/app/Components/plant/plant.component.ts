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
  // ^ The plant is provided as input

  constructor(
    protected PlantImageService: PlantImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get the image based on the plant ID,
    // Decide what information to display based on the URL
    this.getImage(this.plant.id);
    if (this.router.url.includes('/Article')) {
      this.showInfo = true;
    }

    if (this.router.url.includes('/Admin')) {
      this.showInfo = true;
      this.minify = true;
    }
  }

  base64image: SafeUrl;
  loading: boolean = true;
  showInfo: boolean = false;
  minify: boolean = false;

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
    // Navigate the user to the article pointing to this plant
   this.router.navigate(['Article/' + this.plant.id]);
  }

  onLoad() {
    //When image has finished loading, set it to false
    this.loading = false;
  }
}
