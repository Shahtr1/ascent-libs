import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ClientAccountComponent } from '../list/client-account.component';
import { ClientAccountDetailComponent } from '../detail/client-account-detail.component';
import { ClientAccountUpdateComponent } from '../update/client-account-update.component';
import { ClientAccountRoutingResolveService } from './client-account-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const clientAccountRoute: Routes = [
  {
    path: '',
    component: ClientAccountComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClientAccountDetailComponent,
    resolve: {
      clientAccount: ClientAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClientAccountUpdateComponent,
    resolve: {
      clientAccount: ClientAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClientAccountUpdateComponent,
    resolve: {
      clientAccount: ClientAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(clientAccountRoute)],
  exports: [RouterModule],
})
export class ClientAccountRoutingModule {}
