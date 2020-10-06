import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/account/login/login.component';
import { ArticleCreatorComponent } from './components/article-creator/article-creator.component';
import { ArticleComponent } from './components/article/article.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ApprovalComponent } from './components/admin-panel/approval/approval.component';
import { ClimatePanelComponent } from './components/admin-panel/climate-panel/climate-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'About', component: AboutComponent},
  {path:'Contact', component: ContactComponent},
  {path:'List', component: ListComponent},
  {path:'Home', component: HomeComponent},
  {path:'Article-Creator', component: ArticleCreatorComponent},
  {path:'Account', component: AccountComponent},
  {path: 'Account/Login', component: LoginComponent},
  {path: 'Article/:id', component: ArticleComponent},
  {path: 'Admin', component: AdminPanelComponent, children: [
    {path: '', redirectTo: 'approval', pathMatch: 'full'},
    {path: 'approval', component: ApprovalComponent},
    {path: 'climates', component: ClimatePanelComponent}
  ]},
  {path: '', redirectTo: '/Home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
