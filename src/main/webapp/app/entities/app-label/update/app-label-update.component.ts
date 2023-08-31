import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AppLabelFormService, AppLabelFormGroup } from './app-label-form.service';
import { IAppLabel } from '../app-label.model';
import { AppLabelService } from '../service/app-label.service';
import { IAppLanguage } from 'app/entities/app-language/app-language.model';
import { AppLanguageService } from 'app/entities/app-language/service/app-language.service';

@Component({
  selector: 'jhi-app-label-update',
  templateUrl: './app-label-update.component.html',
})
export class AppLabelUpdateComponent implements OnInit {
  isSaving = false;
  appLabel: IAppLabel | null = null;

  appLanguagesSharedCollection: IAppLanguage[] = [];

  editForm: AppLabelFormGroup = this.appLabelFormService.createAppLabelFormGroup();

  constructor(
    protected appLabelService: AppLabelService,
    protected appLabelFormService: AppLabelFormService,
    protected appLanguageService: AppLanguageService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAppLanguage = (o1: IAppLanguage | null, o2: IAppLanguage | null): boolean => this.appLanguageService.compareAppLanguage(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appLabel }) => {
      this.appLabel = appLabel;
      if (appLabel) {
        this.updateForm(appLabel);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appLabel = this.appLabelFormService.getAppLabel(this.editForm);
    if (appLabel.id !== null) {
      this.subscribeToSaveResponse(this.appLabelService.update(appLabel));
    } else {
      this.subscribeToSaveResponse(this.appLabelService.create(appLabel));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppLabel>>): void {
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

  protected updateForm(appLabel: IAppLabel): void {
    this.appLabel = appLabel;
    this.appLabelFormService.resetForm(this.editForm, appLabel);

    this.appLanguagesSharedCollection = this.appLanguageService.addAppLanguageToCollectionIfMissing<IAppLanguage>(
      this.appLanguagesSharedCollection,
      appLabel.language
    );
  }

  protected loadRelationshipsOptions(): void {
    this.appLanguageService
      .query()
      .pipe(map((res: HttpResponse<IAppLanguage[]>) => res.body ?? []))
      .pipe(
        map((appLanguages: IAppLanguage[]) =>
          this.appLanguageService.addAppLanguageToCollectionIfMissing<IAppLanguage>(appLanguages, this.appLabel?.language)
        )
      )
      .subscribe((appLanguages: IAppLanguage[]) => (this.appLanguagesSharedCollection = appLanguages));
  }
}
