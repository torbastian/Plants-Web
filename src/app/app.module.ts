import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { NavBarComponent } from './nav-bar/nav-bar.component';
=======
import { ClimateComponent } from './components/climate/climate.component';
import { ListComponent } from './components/list/list.component';
>>>>>>> c89ddd76ba3994da6b3575c96c5d1577b73515ba

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    NavBarComponent
=======
    ClimateComponent,
    ListComponent
>>>>>>> c89ddd76ba3994da6b3575c96c5d1577b73515ba
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
