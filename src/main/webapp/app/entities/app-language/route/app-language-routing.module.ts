import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AppLanguageComponent } from '../list/app-language.component';
import { AppLanguageDetailComponent } from '../detail/app-language-detail.component';
import { AppLanguageUpdateComponent } from '../update/app-language-update.component';
import { AppLanguageRoutingResolveService } from './app-language-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const appLanguageRoute: Routes = [
  {
    path: '',
    component: AppLanguageComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AppLanguageDetailComponent,
    resolve: {
      appLanguage: AppLanguageRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AppLanguageUpdateComponent,
    resolve: {
      appLanguage: AppLanguageRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AppLanguageUpdateComponent,
    resolve: {
      appLanguage: AppLanguageRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appLanguageRoute)],
  exports: [RouterModule],
})
export class AppLanguageRoutingModule {}
