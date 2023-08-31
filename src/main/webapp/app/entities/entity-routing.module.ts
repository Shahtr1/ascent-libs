import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'test-entity',
        data: { pageTitle: 'TestEntities' },
        loadChildren: () => import('./test-entity/test-entity.module').then(m => m.TestEntityModule),
      },
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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
