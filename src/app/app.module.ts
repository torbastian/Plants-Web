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
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ArticleCreatorComponent } from './components/article-creator/article-creator.component';
import { PlantComponent } from './components/plant/plant.component';


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
    LoginComponent,
    ArticleCreatorComponent,
    PlantComponent
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
