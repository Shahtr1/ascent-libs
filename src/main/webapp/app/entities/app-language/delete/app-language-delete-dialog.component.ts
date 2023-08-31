import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppLanguage } from '../app-language.model';
import { AppLanguageService } from '../service/app-language.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './app-language-delete-dialog.component.html',
})
export class AppLanguageDeleteDialogComponent {
  appLanguage?: IAppLanguage;

  constructor(protected appLanguageService: AppLanguageService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appLanguageService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
