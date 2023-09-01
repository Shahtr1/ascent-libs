import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IClientAccount, NewClientAccount } from '../client-account.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClientAccount for edit and NewClientAccountFormGroupInput for create.
 */
type ClientAccountFormGroupInput = IClientAccount | PartialWithRequiredKeyOf<NewClientAccount>;

type ClientAccountFormDefaults = Pick<NewClientAccount, 'id' | 'isActive' | 'isEnabled'>;

type ClientAccountFormGroupContent = {
  id: FormControl<IClientAccount['id'] | NewClientAccount['id']>;
  refId: FormControl<IClientAccount['refId']>;
  shortname: FormControl<IClientAccount['shortname']>;
  middleName: FormControl<IClientAccount['middleName']>;
  trxnStatus: FormControl<IClientAccount['trxnStatus']>;
  referenceName: FormControl<IClientAccount['referenceName']>;
  amount: FormControl<IClientAccount['amount']>;
  currency: FormControl<IClientAccount['currency']>;
  isActive: FormControl<IClientAccount['isActive']>;
  isEnabled: FormControl<IClientAccount['isEnabled']>;
};

export type ClientAccountFormGroup = FormGroup<ClientAccountFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClientAccountFormService {
  createClientAccountFormGroup(clientAccount: ClientAccountFormGroupInput = { id: null }): ClientAccountFormGroup {
    const clientAccountRawValue = {
      ...this.getFormDefaults(),
      ...clientAccount,
    };
    return new FormGroup<ClientAccountFormGroupContent>({
      id: new FormControl(
        { value: clientAccountRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      refId: new FormControl(clientAccountRawValue.refId, {
        validators: [Validators.required],
      }),
      shortname: new FormControl(clientAccountRawValue.shortname),
      middleName: new FormControl(clientAccountRawValue.middleName),
      trxnStatus: new FormControl(clientAccountRawValue.trxnStatus),
      referenceName: new FormControl(clientAccountRawValue.referenceName),
      amount: new FormControl(clientAccountRawValue.amount),
      currency: new FormControl(clientAccountRawValue.currency),
      isActive: new FormControl(clientAccountRawValue.isActive),
      isEnabled: new FormControl(clientAccountRawValue.isEnabled),
    });
  }

  getClientAccount(form: ClientAccountFormGroup): IClientAccount | NewClientAccount {
    return form.getRawValue() as IClientAccount | NewClientAccount;
  }

  resetForm(form: ClientAccountFormGroup, clientAccount: ClientAccountFormGroupInput): void {
    const clientAccountRawValue = { ...this.getFormDefaults(), ...clientAccount };
    form.reset(
      {
        ...clientAccountRawValue,
        id: { value: clientAccountRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ClientAccountFormDefaults {
    return {
      id: null,
      isActive: false,
      isEnabled: false,
    };
  }
}
