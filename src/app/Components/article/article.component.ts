import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { PlantObj } from '../../models/plant-model';

import { ArticleService } from '../../services/article.service';
import { ArticleObj } from '../../models/article-model';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  plant: PlantObj;
  article: ArticleObj = <ArticleObj>{};
  plantId: number;
  loaded: boolean = false;
  notFound: boolean = false;

  constructor(
    private PlantService: PlantService,
    private ArticleService: ArticleService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    /* Get the ID in the route paramaters and get the plant based on the ID */
    this.route.params.subscribe(params => {
      this.plantId = <number>params["id"];
    })

    this.getPlant();
  }
  
  getPlant() {
    /* Get plant based on plantId */
    this.PlantService.getById(this.plantId).subscribe(
      data => {
        this.plant = <PlantObj>data;
      },
      err => {
        console.log(err);
        this.notFound = true;
      },
      () => this.getArticleByPlantId()
    );
  }

  getArticleByPlantId() {
    /* Get the article based on the plant id */    
    this.ArticleService.getByPlantID(this.plantId).subscribe(
      data => {
        this.article = <ArticleObj>data;
        if (this.article != null) {
          this.loaded = true;
        }
        else {
          this.notFound = true;
        }
      },
      err => console.log(err)
    );
  }

  goBack() {
    /* Go back in the users browsing history */
    this.location.back();
  }
}
