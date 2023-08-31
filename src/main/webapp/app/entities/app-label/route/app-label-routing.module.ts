import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AppLabelComponent } from '../list/app-label.component';
import { AppLabelDetailComponent } from '../detail/app-label-detail.component';
import { AppLabelUpdateComponent } from '../update/app-label-update.component';
import { AppLabelRoutingResolveService } from './app-label-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const appLabelRoute: Routes = [
  {
    path: '',
    component: AppLabelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AppLabelDetailComponent,
    resolve: {
      appLabel: AppLabelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AppLabelUpdateComponent,
    resolve: {
      appLabel: AppLabelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AppLabelUpdateComponent,
    resolve: {
      appLabel: AppLabelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appLabelRoute)],
  exports: [RouterModule],
})
export class AppLabelRoutingModule {}
