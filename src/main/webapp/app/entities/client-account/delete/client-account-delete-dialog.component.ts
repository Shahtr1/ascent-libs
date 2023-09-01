import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IClientAccount } from '../client-account.model';
import { ClientAccountService } from '../service/client-account.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './client-account-delete-dialog.component.html',
})
export class ClientAccountDeleteDialogComponent {
  clientAccount?: IClientAccount;

  constructor(protected clientAccountService: ClientAccountService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clientAccountService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
