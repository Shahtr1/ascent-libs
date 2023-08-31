import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AppBaseTableComponent } from '../list/app-base-table.component';
import { AppBaseTableDetailComponent } from '../detail/app-base-table-detail.component';
import { AppBaseTableUpdateComponent } from '../update/app-base-table-update.component';
import { AppBaseTableRoutingResolveService } from './app-base-table-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const appBaseTableRoute: Routes = [
  {
    path: '',
    component: AppBaseTableComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AppBaseTableDetailComponent,
    resolve: {
      appBaseTable: AppBaseTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AppBaseTableUpdateComponent,
    resolve: {
      appBaseTable: AppBaseTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AppBaseTableUpdateComponent,
    resolve: {
      appBaseTable: AppBaseTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appBaseTableRoute)],
  exports: [RouterModule],
})
export class AppBaseTableRoutingModule {}
