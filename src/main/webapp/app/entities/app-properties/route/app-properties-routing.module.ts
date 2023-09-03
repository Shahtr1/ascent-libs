import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AppPropertiesComponent } from '../list/app-properties.component';
import { AppPropertiesDetailComponent } from '../detail/app-properties-detail.component';
import { AppPropertiesUpdateComponent } from '../update/app-properties-update.component';
import { AppPropertiesRoutingResolveService } from './app-properties-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const appPropertiesRoute: Routes = [
  {
    path: '',
    component: AppPropertiesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AppPropertiesDetailComponent,
    resolve: {
      appProperties: AppPropertiesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AppPropertiesUpdateComponent,
    resolve: {
      appProperties: AppPropertiesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AppPropertiesUpdateComponent,
    resolve: {
      appProperties: AppPropertiesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appPropertiesRoute)],
  exports: [RouterModule],
})
export class AppPropertiesRoutingModule {}
