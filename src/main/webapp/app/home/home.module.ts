import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { TableModule } from 'primeng/table';
import { AscSharedLibsModule } from 'asc-shared-libs';
import { environment } from '../environment';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), TableModule, AscSharedLibsModule],
  declarations: [HomeComponent],
  providers: [{ provide: 'environment', useValue: environment }],
})
export class HomeModule {}
