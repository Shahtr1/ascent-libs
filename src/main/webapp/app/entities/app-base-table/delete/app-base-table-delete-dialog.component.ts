import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppBaseTable } from '../app-base-table.model';
import { AppBaseTableService } from '../service/app-base-table.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './app-base-table-delete-dialog.component.html',
})
export class AppBaseTableDeleteDialogComponent {
  appBaseTable?: IAppBaseTable;

  constructor(protected appBaseTableService: AppBaseTableService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appBaseTableService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
