import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClimateComponent } from './components/climate/climate.component';
import { ListComponent } from './components/list/list.component';
import {FooterComponent} from './components/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ClimateComponent,
    FooterComponent,
    ListComponent
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
