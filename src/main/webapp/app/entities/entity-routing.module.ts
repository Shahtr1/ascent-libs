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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
