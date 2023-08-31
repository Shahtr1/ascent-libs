import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../app-label.test-samples';

import { AppLabelFormService } from './app-label-form.service';

describe('AppLabel Form Service', () => {
  let service: AppLabelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLabelFormService);
  });

  describe('Service methods', () => {
    describe('createAppLabelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAppLabelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uuid: expect.any(Object),
            value: expect.any(Object),
            language: expect.any(Object),
          })
        );
      });

      it('passing IAppLabel should create a new form with FormGroup', () => {
        const formGroup = service.createAppLabelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uuid: expect.any(Object),
            value: expect.any(Object),
            language: expect.any(Object),
          })
        );
      });
    });

    describe('getAppLabel', () => {
      it('should return NewAppLabel for default AppLabel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAppLabelFormGroup(sampleWithNewData);

        const appLabel = service.getAppLabel(formGroup) as any;

        expect(appLabel).toMatchObject(sampleWithNewData);
      });

      it('should return NewAppLabel for empty AppLabel initial value', () => {
        const formGroup = service.createAppLabelFormGroup();

        const appLabel = service.getAppLabel(formGroup) as any;

        expect(appLabel).toMatchObject({});
      });

      it('should return IAppLabel', () => {
        const formGroup = service.createAppLabelFormGroup(sampleWithRequiredData);

        const appLabel = service.getAppLabel(formGroup) as any;

        expect(appLabel).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAppLabel should not enable id FormControl', () => {
        const formGroup = service.createAppLabelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAppLabel should disable id FormControl', () => {
        const formGroup = service.createAppLabelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
