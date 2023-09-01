import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ClientAccountFormService, ClientAccountFormGroup } from './client-account-form.service';
import { IClientAccount } from '../client-account.model';
import { ClientAccountService } from '../service/client-account.service';

@Component({
  selector: 'jhi-client-account-update',
  templateUrl: './client-account-update.component.html',
})
export class ClientAccountUpdateComponent implements OnInit {
  isSaving = false;
  clientAccount: IClientAccount | null = null;

  editForm: ClientAccountFormGroup = this.clientAccountFormService.createClientAccountFormGroup();

  constructor(
    protected clientAccountService: ClientAccountService,
    protected clientAccountFormService: ClientAccountFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clientAccount }) => {
      this.clientAccount = clientAccount;
      if (clientAccount) {
        this.updateForm(clientAccount);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const clientAccount = this.clientAccountFormService.getClientAccount(this.editForm);
    if (clientAccount.id !== null) {
      this.subscribeToSaveResponse(this.clientAccountService.update(clientAccount));
    } else {
      this.subscribeToSaveResponse(this.clientAccountService.create(clientAccount));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClientAccount>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(clientAccount: IClientAccount): void {
    this.clientAccount = clientAccount;
    this.clientAccountFormService.resetForm(this.editForm, clientAccount);
  }
}
