import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../app-language.test-samples';

import { AppLanguageFormService } from './app-language-form.service';

describe('AppLanguage Form Service', () => {
  let service: AppLanguageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLanguageFormService);
  });

  describe('Service methods', () => {
    describe('createAppLanguageFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAppLanguageFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uuid: expect.any(Object),
            name: expect.any(Object),
            direction: expect.any(Object),
          })
        );
      });

      it('passing IAppLanguage should create a new form with FormGroup', () => {
        const formGroup = service.createAppLanguageFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uuid: expect.any(Object),
            name: expect.any(Object),
            direction: expect.any(Object),
          })
        );
      });
    });

    describe('getAppLanguage', () => {
      it('should return NewAppLanguage for default AppLanguage initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAppLanguageFormGroup(sampleWithNewData);

        const appLanguage = service.getAppLanguage(formGroup) as any;

        expect(appLanguage).toMatchObject(sampleWithNewData);
      });

      it('should return NewAppLanguage for empty AppLanguage initial value', () => {
        const formGroup = service.createAppLanguageFormGroup();

        const appLanguage = service.getAppLanguage(formGroup) as any;

        expect(appLanguage).toMatchObject({});
      });

      it('should return IAppLanguage', () => {
        const formGroup = service.createAppLanguageFormGroup(sampleWithRequiredData);

        const appLanguage = service.getAppLanguage(formGroup) as any;

        expect(appLanguage).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAppLanguage should not enable id FormControl', () => {
        const formGroup = service.createAppLanguageFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAppLanguage should disable id FormControl', () => {
        const formGroup = service.createAppLanguageFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
