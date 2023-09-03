import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'app-base-table',
        data: { pageTitle: 'AppBaseTables' },
        loadChildren: () => import('./app-base-table/app-base-table.module').then(m => m.AppBaseTableModule),
      },
      {
        path: 'app-label',
        data: { pageTitle: 'AppLabels' },
        loadChildren: () => import('./app-label/app-label.module').then(m => m.AppLabelModule),
      },
      {
        path: 'app-language',
        data: { pageTitle: 'AppLanguages' },
        loadChildren: () => import('./app-language/app-language.module').then(m => m.AppLanguageModule),
      },
      {
        path: 'app-properties',
        data: { pageTitle: 'AppProperties' },
        loadChildren: () => import('./app-properties/app-properties.module').then(m => m.AppPropertiesModule),
      },
      {
        path: 'client-account',
        data: { pageTitle: 'ClientAccounts' },
        loadChildren: () => import('./client-account/client-account.module').then(m => m.ClientAccountModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
