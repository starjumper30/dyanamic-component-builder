import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentComponent} from './content/content.component';
import { Content2Component } from './content2/content2.component';

const routes: Routes = [
  {
    path: 'content1',
    component: ContentComponent
  },
  {
    path: 'content2',
    component: Content2Component
  },
  {
    path: 'justAFakeRouteToBuildTheModule',
    loadChildren: './dynamic/dynamic.module#DynamicModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
