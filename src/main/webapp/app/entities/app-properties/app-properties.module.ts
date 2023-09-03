import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AppPropertiesComponent } from './list/app-properties.component';
import { AppPropertiesDetailComponent } from './detail/app-properties-detail.component';
import { AppPropertiesUpdateComponent } from './update/app-properties-update.component';
import { AppPropertiesDeleteDialogComponent } from './delete/app-properties-delete-dialog.component';
import { AppPropertiesRoutingModule } from './route/app-properties-routing.module';

@NgModule({
  imports: [SharedModule, AppPropertiesRoutingModule],
  declarations: [AppPropertiesComponent, AppPropertiesDetailComponent, AppPropertiesUpdateComponent, AppPropertiesDeleteDialogComponent],
})
export class AppPropertiesModule {}
