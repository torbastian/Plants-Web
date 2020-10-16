import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/account/login/login.component';
import { ArticleCreatorComponent } from './components/article-creator/article-creator.component';
import {PlantCreateComponent} from './Components/plant-create/plant-create.component';
import { ArticleComponent } from './components/article/article.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ApprovalComponent } from './components/admin-panel/approval/approval.component';
import { ClimatePanelComponent } from './components/admin-panel/climate-panel/climate-panel.component';
import { TypePanelComponent } from './components/admin-panel/type-panel/type-panel.component';
import { EdiblePanelComponent } from './components/admin-panel/edible-panel/edible-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path:'About', component: AboutComponent},
  {path:'Contact', component: ContactComponent},
  {path:'List', component: ListComponent},
  {path:'Home', component: HomeComponent},
  {path:'Article-Creator', component: ArticleCreatorComponent},
  {path:'Account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'Account/Login', component: LoginComponent},
  {path: '', redirectTo: '/Home', pathMatch: 'full'},
  {path:'PlantCreate', component: PlantCreateComponent},
  {path: 'Article/:id', component: ArticleComponent},
  {path: 'Admin', component: AdminPanelComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'approval', pathMatch: 'full'},
    {path: 'approval', component: ApprovalComponent},
    {path: 'climates', component: ClimatePanelComponent},
    {path: 'types', component: TypePanelComponent},
    {path: 'edibles', component: EdiblePanelComponent}
  ]},
  {path: '', redirectTo: '/Home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
