import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PlantImageService, ImagePlant } from "../../services/plant.service";
import { PlantObj } from 'src/app/models/plant-model';

@Component({
  selector: 'app-article-creator',
  templateUrl: './article-creator.component.html',
  styleUrls: ['./article-creator.component.css']
})
export class ArticleCreatorComponent implements OnInit {
  ArticleForm = new FormGroup({
    PlantID: new FormControl(1, Validators.required),
    Image: new FormControl("", Validators.required)
  });

  constructor(
    private plantImageService: PlantImageService
  ) { }

  ngOnInit(): void {
  }

  url = null;
  base64image = null;

  //When the file is changed on the site
  onFileChanged(event) {
    //Check if there is a file
    if (event.target.files && event.target.files[0]) {
      //Construct new file reader to load file
      var reader = new FileReader();
      let file = event.target.files[0];

      //Read the data as Base64
      reader.readAsDataURL(file);

      //When the reader is finished, set url to the image, 
      //so that it is displayed, and set base64image to
      //a pure Base64 encoding of the image
      reader.onload = (event) => {
        this.url = reader.result;
        console.log(this.url);
        this.base64image = btoa(this.url);
      }
    }
  }

  post() {
    /* update the image of the plant */
    let id = this.ArticleForm.value.PlantID;
    let iPlant = new ImagePlant();
    iPlant.image = this.base64image;

    this.plantImageService.put(id, iPlant).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err),
      () => console.log("Updated plant " + id)
    );

  }
}
