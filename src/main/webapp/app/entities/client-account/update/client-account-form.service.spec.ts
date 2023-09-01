import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../client-account.test-samples';

import { ClientAccountFormService } from './client-account-form.service';

describe('ClientAccount Form Service', () => {
  let service: ClientAccountFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAccountFormService);
  });

  describe('Service methods', () => {
    describe('createClientAccountFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createClientAccountFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            refId: expect.any(Object),
            shortname: expect.any(Object),
            middleName: expect.any(Object),
            trxnStatus: expect.any(Object),
            referenceName: expect.any(Object),
            amount: expect.any(Object),
            currency: expect.any(Object),
            isActive: expect.any(Object),
            isEnabled: expect.any(Object),
          })
        );
      });

      it('passing IClientAccount should create a new form with FormGroup', () => {
        const formGroup = service.createClientAccountFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            refId: expect.any(Object),
            shortname: expect.any(Object),
            middleName: expect.any(Object),
            trxnStatus: expect.any(Object),
            referenceName: expect.any(Object),
            amount: expect.any(Object),
            currency: expect.any(Object),
            isActive: expect.any(Object),
            isEnabled: expect.any(Object),
          })
        );
      });
    });

    describe('getClientAccount', () => {
      it('should return NewClientAccount for default ClientAccount initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createClientAccountFormGroup(sampleWithNewData);

        const clientAccount = service.getClientAccount(formGroup) as any;

        expect(clientAccount).toMatchObject(sampleWithNewData);
      });

      it('should return NewClientAccount for empty ClientAccount initial value', () => {
        const formGroup = service.createClientAccountFormGroup();

        const clientAccount = service.getClientAccount(formGroup) as any;

        expect(clientAccount).toMatchObject({});
      });

      it('should return IClientAccount', () => {
        const formGroup = service.createClientAccountFormGroup(sampleWithRequiredData);

        const clientAccount = service.getClientAccount(formGroup) as any;

        expect(clientAccount).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IClientAccount should not enable id FormControl', () => {
        const formGroup = service.createClientAccountFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewClientAccount should disable id FormControl', () => {
        const formGroup = service.createClientAccountFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
