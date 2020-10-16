import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PlantImageService, ImagePlant } from "../../services/plant.service";//Not needed??
import { AccountService } from "../../services/account.service";
import { PlantObj } from '../../models/plant-model';
import {PlantService} from "../../services/plant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user-model";
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-article-creator',
  templateUrl: './article-creator.component.html',
  styleUrls: ['./article-creator.component.css']
})
export class ArticleCreatorComponent implements OnInit {
  //ArticleID Should be auto, PlantID, Approved, Text, Tips
  ArticleForm = new FormGroup({
    Text: new FormControl("", Validators.required),//Main article
    Tips: new FormControl("", Validators.required),//simple notes
  });

  constructor(
    private plantImageService: PlantImageService,//Not needed??
    private PlantService: PlantService,
    private AccountService: AccountService,
    private route: ActivatedRoute,
    private Router: Router,
    private ArticleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.PlantID = <number>params["id"];
    });
    this.checkUser();

  }
//VARIABLES
PlantID: number = 0;
UserID: number = 0;
checkUser(){
  this.UserID = this.AccountService.userValue.id;
  let _User: User = null;
  this.PlantService.getOwner(this.PlantID).subscribe(user => {
    _User = <User> user;
    if( this.UserID != _User.id){
      this.Router.navigate(["/Home"]);
    }
  })
}

  post() {
    let _Values = this.ArticleForm.value;
    let _article: any = {
     
      Text: _Values.Text,
      Tips: _Values.Tips,
      PlantsID: <Number> this.PlantID
    };

    let _ArticleID: number = 0;
    console.log(_article);
    
    this.ArticleService.create(_article).subscribe(
      data => {
        _ArticleID = data.ArticleID;
      }, err => console.error(err)),
      ()=> {
        if(_ArticleID != 0)
        this.Router.navigate(["/" + _ArticleID])
        else{
          this.Router.navigate(["/Home"]);
        }
      };
  }
}
