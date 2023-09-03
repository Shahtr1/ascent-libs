import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppProperties } from '../app-properties.model';
import { AppPropertiesService } from '../service/app-properties.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './app-properties-delete-dialog.component.html',
})
export class AppPropertiesDeleteDialogComponent {
  appProperties?: IAppProperties;

  constructor(protected appPropertiesService: AppPropertiesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appPropertiesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
