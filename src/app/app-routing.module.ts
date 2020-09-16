import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ArticleCreatorComponent } from './components/article-creator/article-creator.component';

const routes: Routes = [
  {path:'About', component: AboutComponent},
  {path:'Contact', component: ContactComponent},
  {path:'Types', component: ListComponent},
  {path:'Home', component: HomeComponent},
  {path:'Login', component: LoginComponent},
  {path:'Article-Creator', component: ArticleCreatorComponent},
  {path: '', redirectTo: '/Home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
