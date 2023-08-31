import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AppLanguageFormService, AppLanguageFormGroup } from './app-language-form.service';
import { IAppLanguage } from '../app-language.model';
import { AppLanguageService } from '../service/app-language.service';
import { LanguageDirection } from 'app/entities/enumerations/language-direction.model';

@Component({
  selector: 'jhi-app-language-update',
  templateUrl: './app-language-update.component.html',
})
export class AppLanguageUpdateComponent implements OnInit {
  isSaving = false;
  appLanguage: IAppLanguage | null = null;
  languageDirectionValues = Object.keys(LanguageDirection);

  editForm: AppLanguageFormGroup = this.appLanguageFormService.createAppLanguageFormGroup();

  constructor(
    protected appLanguageService: AppLanguageService,
    protected appLanguageFormService: AppLanguageFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appLanguage }) => {
      this.appLanguage = appLanguage;
      if (appLanguage) {
        this.updateForm(appLanguage);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appLanguage = this.appLanguageFormService.getAppLanguage(this.editForm);
    if (appLanguage.id !== null) {
      this.subscribeToSaveResponse(this.appLanguageService.update(appLanguage));
    } else {
      this.subscribeToSaveResponse(this.appLanguageService.create(appLanguage));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppLanguage>>): void {
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

  protected updateForm(appLanguage: IAppLanguage): void {
    this.appLanguage = appLanguage;
    this.appLanguageFormService.resetForm(this.editForm, appLanguage);
  }
}
