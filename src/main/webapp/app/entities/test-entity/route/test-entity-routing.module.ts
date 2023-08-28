import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TestEntityComponent } from '../list/test-entity.component';
import { TestEntityDetailComponent } from '../detail/test-entity-detail.component';
import { TestEntityUpdateComponent } from '../update/test-entity-update.component';
import { TestEntityRoutingResolveService } from './test-entity-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const testEntityRoute: Routes = [
  {
    path: '',
    component: TestEntityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TestEntityDetailComponent,
    resolve: {
      testEntity: TestEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TestEntityUpdateComponent,
    resolve: {
      testEntity: TestEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TestEntityUpdateComponent,
    resolve: {
      testEntity: TestEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(testEntityRoute)],
  exports: [RouterModule],
})
export class TestEntityRoutingModule {}
