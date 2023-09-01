import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ClientAccountComponent } from './list/client-account.component';
import { ClientAccountDetailComponent } from './detail/client-account-detail.component';
import { ClientAccountUpdateComponent } from './update/client-account-update.component';
import { ClientAccountDeleteDialogComponent } from './delete/client-account-delete-dialog.component';
import { ClientAccountRoutingModule } from './route/client-account-routing.module';

@NgModule({
  imports: [SharedModule, ClientAccountRoutingModule],
  declarations: [ClientAccountComponent, ClientAccountDetailComponent, ClientAccountUpdateComponent, ClientAccountDeleteDialogComponent],
})
export class ClientAccountModule {}
