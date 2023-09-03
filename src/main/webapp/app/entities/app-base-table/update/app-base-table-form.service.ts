import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAppBaseTable, NewAppBaseTable } from '../app-base-table.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAppBaseTable for edit and NewAppBaseTableFormGroupInput for create.
 */
type AppBaseTableFormGroupInput = IAppBaseTable | PartialWithRequiredKeyOf<NewAppBaseTable>;

type AppBaseTableFormDefaults = Pick<NewAppBaseTable, 'id'>;

type AppBaseTableFormGroupContent = {
  id: FormControl<IAppBaseTable['id'] | NewAppBaseTable['id']>;
  uuid: FormControl<IAppBaseTable['uuid']>;
  viewConfig: FormControl<IAppBaseTable['viewConfig']>;
};

export type AppBaseTableFormGroup = FormGroup<AppBaseTableFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AppBaseTableFormService {
  createAppBaseTableFormGroup(appBaseTable: AppBaseTableFormGroupInput = { id: null }): AppBaseTableFormGroup {
    const appBaseTableRawValue = {
      ...this.getFormDefaults(),
      ...appBaseTable,
    };
    return new FormGroup<AppBaseTableFormGroupContent>({
      id: new FormControl(
        { value: appBaseTableRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      uuid: new FormControl(appBaseTableRawValue.uuid, {
        validators: [Validators.required],
      }),
      viewConfig: new FormControl(appBaseTableRawValue.viewConfig, {
        validators: [Validators.required],
      }),
    });
  }

  getAppBaseTable(form: AppBaseTableFormGroup): IAppBaseTable | NewAppBaseTable {
    return form.getRawValue() as IAppBaseTable | NewAppBaseTable;
  }

  resetForm(form: AppBaseTableFormGroup, appBaseTable: AppBaseTableFormGroupInput): void {
    const appBaseTableRawValue = { ...this.getFormDefaults(), ...appBaseTable };
    form.reset(
      {
        ...appBaseTableRawValue,
        id: { value: appBaseTableRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AppBaseTableFormDefaults {
    return {
      id: null,
    };
  }
}
