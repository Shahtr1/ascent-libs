import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../app-properties.test-samples';

import { AppPropertiesFormService } from './app-properties-form.service';

describe('AppProperties Form Service', () => {
  let service: AppPropertiesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppPropertiesFormService);
  });

  describe('Service methods', () => {
    describe('createAppPropertiesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAppPropertiesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uuid: expect.any(Object),
            name: expect.any(Object),
            value: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });

      it('passing IAppProperties should create a new form with FormGroup', () => {
        const formGroup = service.createAppPropertiesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uuid: expect.any(Object),
            name: expect.any(Object),
            value: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });
    });

    describe('getAppProperties', () => {
      it('should return NewAppProperties for default AppProperties initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAppPropertiesFormGroup(sampleWithNewData);

        const appProperties = service.getAppProperties(formGroup) as any;

        expect(appProperties).toMatchObject(sampleWithNewData);
      });

      it('should return NewAppProperties for empty AppProperties initial value', () => {
        const formGroup = service.createAppPropertiesFormGroup();

        const appProperties = service.getAppProperties(formGroup) as any;

        expect(appProperties).toMatchObject({});
      });

      it('should return IAppProperties', () => {
        const formGroup = service.createAppPropertiesFormGroup(sampleWithRequiredData);

        const appProperties = service.getAppProperties(formGroup) as any;

        expect(appProperties).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAppProperties should not enable id FormControl', () => {
        const formGroup = service.createAppPropertiesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAppProperties should disable id FormControl', () => {
        const formGroup = service.createAppPropertiesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
