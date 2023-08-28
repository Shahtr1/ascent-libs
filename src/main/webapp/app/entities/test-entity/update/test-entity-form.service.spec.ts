import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../test-entity.test-samples';

import { TestEntityFormService } from './test-entity-form.service';

describe('TestEntity Form Service', () => {
  let service: TestEntityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestEntityFormService);
  });

  describe('Service methods', () => {
    describe('createTestEntityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTestEntityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          })
        );
      });

      it('passing ITestEntity should create a new form with FormGroup', () => {
        const formGroup = service.createTestEntityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          })
        );
      });
    });

    describe('getTestEntity', () => {
      it('should return NewTestEntity for default TestEntity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTestEntityFormGroup(sampleWithNewData);

        const testEntity = service.getTestEntity(formGroup) as any;

        expect(testEntity).toMatchObject(sampleWithNewData);
      });

      it('should return NewTestEntity for empty TestEntity initial value', () => {
        const formGroup = service.createTestEntityFormGroup();

        const testEntity = service.getTestEntity(formGroup) as any;

        expect(testEntity).toMatchObject({});
      });

      it('should return ITestEntity', () => {
        const formGroup = service.createTestEntityFormGroup(sampleWithRequiredData);

        const testEntity = service.getTestEntity(formGroup) as any;

        expect(testEntity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITestEntity should not enable id FormControl', () => {
        const formGroup = service.createTestEntityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTestEntity should disable id FormControl', () => {
        const formGroup = service.createTestEntityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
