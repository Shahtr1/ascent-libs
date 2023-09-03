import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AppPropertiesFormService, AppPropertiesFormGroup } from './app-properties-form.service';
import { IAppProperties } from '../app-properties.model';
import { AppPropertiesService } from '../service/app-properties.service';

@Component({
  selector: 'jhi-app-properties-update',
  templateUrl: './app-properties-update.component.html',
})
export class AppPropertiesUpdateComponent implements OnInit {
  isSaving = false;
  appProperties: IAppProperties | null = null;

  editForm: AppPropertiesFormGroup = this.appPropertiesFormService.createAppPropertiesFormGroup();

  constructor(
    protected appPropertiesService: AppPropertiesService,
    protected appPropertiesFormService: AppPropertiesFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appProperties }) => {
      this.appProperties = appProperties;
      if (appProperties) {
        this.updateForm(appProperties);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appProperties = this.appPropertiesFormService.getAppProperties(this.editForm);
    if (appProperties.id !== null) {
      this.subscribeToSaveResponse(this.appPropertiesService.update(appProperties));
    } else {
      this.subscribeToSaveResponse(this.appPropertiesService.create(appProperties));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppProperties>>): void {
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

  protected updateForm(appProperties: IAppProperties): void {
    this.appProperties = appProperties;
    this.appPropertiesFormService.resetForm(this.editForm, appProperties);
  }
}
