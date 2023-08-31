import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AppLanguageComponent } from './list/app-language.component';
import { AppLanguageDetailComponent } from './detail/app-language-detail.component';
import { AppLanguageUpdateComponent } from './update/app-language-update.component';
import { AppLanguageDeleteDialogComponent } from './delete/app-language-delete-dialog.component';
import { AppLanguageRoutingModule } from './route/app-language-routing.module';

@NgModule({
  imports: [SharedModule, AppLanguageRoutingModule],
  declarations: [AppLanguageComponent, AppLanguageDetailComponent, AppLanguageUpdateComponent, AppLanguageDeleteDialogComponent],
})
export class AppLanguageModule {}
