import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITestEntity } from '../test-entity.model';
import { TestEntityService } from '../service/test-entity.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './test-entity-delete-dialog.component.html',
})
export class TestEntityDeleteDialogComponent {
  testEntity?: ITestEntity;

  constructor(protected testEntityService: TestEntityService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.testEntityService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
