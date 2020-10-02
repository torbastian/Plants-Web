import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ClimateComponent } from './components/climate/climate.component';
import { ListComponent } from './components/list/list.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleCreatorComponent } from './components/article-creator/article-creator.component';
import { PlantComponent } from './components/plant/plant.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/account/login/login.component';
import { ArticleComponent } from './components/article/article.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ClimateComponent,
    FooterComponent,
    ListComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    ArticleCreatorComponent,
    PlantComponent,
    AccountComponent,
    LoginComponent,
    ArticleComponent,
    CommentsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
