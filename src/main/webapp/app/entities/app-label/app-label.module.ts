import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AppLabelComponent } from './list/app-label.component';
import { AppLabelDetailComponent } from './detail/app-label-detail.component';
import { AppLabelUpdateComponent } from './update/app-label-update.component';
import { AppLabelDeleteDialogComponent } from './delete/app-label-delete-dialog.component';
import { AppLabelRoutingModule } from './route/app-label-routing.module';

@NgModule({
  imports: [SharedModule, AppLabelRoutingModule],
  declarations: [AppLabelComponent, AppLabelDetailComponent, AppLabelUpdateComponent, AppLabelDeleteDialogComponent],
})
export class AppLabelModule {}
