import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AppBaseTableFormService, AppBaseTableFormGroup } from './app-base-table-form.service';
import { IAppBaseTable } from '../app-base-table.model';
import { AppBaseTableService } from '../service/app-base-table.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-app-base-table-update',
  templateUrl: './app-base-table-update.component.html',
})
export class AppBaseTableUpdateComponent implements OnInit {
  isSaving = false;
  appBaseTable: IAppBaseTable | null = null;

  editForm: AppBaseTableFormGroup = this.appBaseTableFormService.createAppBaseTableFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected appBaseTableService: AppBaseTableService,
    protected appBaseTableFormService: AppBaseTableFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appBaseTable }) => {
      this.appBaseTable = appBaseTable;
      if (appBaseTable) {
        this.updateForm(appBaseTable);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('ascentLibsApiApp.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appBaseTable = this.appBaseTableFormService.getAppBaseTable(this.editForm);
    if (appBaseTable.id !== null) {
      this.subscribeToSaveResponse(this.appBaseTableService.update(appBaseTable));
    } else {
      this.subscribeToSaveResponse(this.appBaseTableService.create(appBaseTable));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppBaseTable>>): void {
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

  protected updateForm(appBaseTable: IAppBaseTable): void {
    this.appBaseTable = appBaseTable;
    this.appBaseTableFormService.resetForm(this.editForm, appBaseTable);
  }
}
