import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../app-base-table.test-samples';

import { AppBaseTableFormService } from './app-base-table-form.service';

describe('AppBaseTable Form Service', () => {
  let service: AppBaseTableFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppBaseTableFormService);
  });

  describe('Service methods', () => {
    describe('createAppBaseTableFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAppBaseTableFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            viewConfig: expect.any(Object),
          })
        );
      });

      it('passing IAppBaseTable should create a new form with FormGroup', () => {
        const formGroup = service.createAppBaseTableFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            viewConfig: expect.any(Object),
          })
        );
      });
    });

    describe('getAppBaseTable', () => {
      it('should return NewAppBaseTable for default AppBaseTable initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAppBaseTableFormGroup(sampleWithNewData);

        const appBaseTable = service.getAppBaseTable(formGroup) as any;

        expect(appBaseTable).toMatchObject(sampleWithNewData);
      });

      it('should return NewAppBaseTable for empty AppBaseTable initial value', () => {
        const formGroup = service.createAppBaseTableFormGroup();

        const appBaseTable = service.getAppBaseTable(formGroup) as any;

        expect(appBaseTable).toMatchObject({});
      });

      it('should return IAppBaseTable', () => {
        const formGroup = service.createAppBaseTableFormGroup(sampleWithRequiredData);

        const appBaseTable = service.getAppBaseTable(formGroup) as any;

        expect(appBaseTable).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAppBaseTable should not enable id FormControl', () => {
        const formGroup = service.createAppBaseTableFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAppBaseTable should disable id FormControl', () => {
        const formGroup = service.createAppBaseTableFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
