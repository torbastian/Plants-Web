import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from "../../services/account.service";
import { PlantService } from "../../services/plant.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../models/user-model";
import { ArticleService } from "../../services/article.service";

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
    private PlantService: PlantService,
    private AccountService: AccountService,
    private route: ActivatedRoute,
    private Router: Router,
    private ArticleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let _param = <number>params["id"];
      this.PlantID = Number(_param);
    });
    this.checkUser();
  }

  //VARIABLES
  PlantID: number = 0;
  UserID: number = 0;

  checkUser() {
    this.UserID = this.AccountService.userValue.id;
    let _User: User = null;
    this.PlantService.getOwner(this.PlantID).subscribe(user => {
      _User = <User>user;
      if (this.UserID != _User.id) {
        this.Router.navigate(["/Home"]);
      }
    })
  }

  post() {
    let _Values = this.ArticleForm.value;
    let _article: any = {
      Text: _Values.Text,
      Tips: _Values.Tips,
      PlantsID: this.PlantID
    };

    this.ArticleService.create(_article).subscribe(
      data => {
        this.navigateUser(data.articleID);
      }, err => console.error(err))
  }

  navigateUser(articleID: number) {
    this.Router.navigate(["Article/" + articleID]);
  }
}
