import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TestEntityFormService, TestEntityFormGroup } from './test-entity-form.service';
import { ITestEntity } from '../test-entity.model';
import { TestEntityService } from '../service/test-entity.service';

@Component({
  selector: 'jhi-test-entity-update',
  templateUrl: './test-entity-update.component.html',
})
export class TestEntityUpdateComponent implements OnInit {
  isSaving = false;
  testEntity: ITestEntity | null = null;

  editForm: TestEntityFormGroup = this.testEntityFormService.createTestEntityFormGroup();

  constructor(
    protected testEntityService: TestEntityService,
    protected testEntityFormService: TestEntityFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testEntity }) => {
      this.testEntity = testEntity;
      if (testEntity) {
        this.updateForm(testEntity);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const testEntity = this.testEntityFormService.getTestEntity(this.editForm);
    if (testEntity.id !== null) {
      this.subscribeToSaveResponse(this.testEntityService.update(testEntity));
    } else {
      this.subscribeToSaveResponse(this.testEntityService.create(testEntity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITestEntity>>): void {
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

  protected updateForm(testEntity: ITestEntity): void {
    this.testEntity = testEntity;
    this.testEntityFormService.resetForm(this.editForm, testEntity);
  }
}
