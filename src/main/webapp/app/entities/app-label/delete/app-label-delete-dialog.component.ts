import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppLabel } from '../app-label.model';
import { AppLabelService } from '../service/app-label.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './app-label-delete-dialog.component.html',
})
export class AppLabelDeleteDialogComponent {
  appLabel?: IAppLabel;

  constructor(protected appLabelService: AppLabelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appLabelService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
