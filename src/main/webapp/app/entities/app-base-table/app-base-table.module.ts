import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AppBaseTableComponent } from './list/app-base-table.component';
import { AppBaseTableDetailComponent } from './detail/app-base-table-detail.component';
import { AppBaseTableUpdateComponent } from './update/app-base-table-update.component';
import { AppBaseTableDeleteDialogComponent } from './delete/app-base-table-delete-dialog.component';
import { AppBaseTableRoutingModule } from './route/app-base-table-routing.module';

@NgModule({
  imports: [SharedModule, AppBaseTableRoutingModule],
  declarations: [AppBaseTableComponent, AppBaseTableDetailComponent, AppBaseTableUpdateComponent, AppBaseTableDeleteDialogComponent],
})
export class AppBaseTableModule {}
