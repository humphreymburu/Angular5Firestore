import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';

import { NoContentComponent } from './no-content';


import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent, data: {title: 'Visualization'} },
  { path: 'about', component: AboutComponent },
 // { path: 'user', loadChildren: './+users/profile.module#ProfileModule'},
 // { path: 'login',loadChildren: './+users/profile.module#ProfileModule'},
  { path: '**',    component: NoContentComponent },
];
