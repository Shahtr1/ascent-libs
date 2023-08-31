import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAppLabel, NewAppLabel } from '../app-label.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAppLabel for edit and NewAppLabelFormGroupInput for create.
 */
type AppLabelFormGroupInput = IAppLabel | PartialWithRequiredKeyOf<NewAppLabel>;

type AppLabelFormDefaults = Pick<NewAppLabel, 'id'>;

type AppLabelFormGroupContent = {
  id: FormControl<IAppLabel['id'] | NewAppLabel['id']>;
  uuid: FormControl<IAppLabel['uuid']>;
  value: FormControl<IAppLabel['value']>;
  language: FormControl<IAppLabel['language']>;
};

export type AppLabelFormGroup = FormGroup<AppLabelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AppLabelFormService {
  createAppLabelFormGroup(appLabel: AppLabelFormGroupInput = { id: null }): AppLabelFormGroup {
    const appLabelRawValue = {
      ...this.getFormDefaults(),
      ...appLabel,
    };
    return new FormGroup<AppLabelFormGroupContent>({
      id: new FormControl(
        { value: appLabelRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      uuid: new FormControl(appLabelRawValue.uuid, {
        validators: [Validators.required],
      }),
      value: new FormControl(appLabelRawValue.value, {
        validators: [Validators.required],
      }),
      language: new FormControl(appLabelRawValue.language),
    });
  }

  getAppLabel(form: AppLabelFormGroup): IAppLabel | NewAppLabel {
    return form.getRawValue() as IAppLabel | NewAppLabel;
  }

  resetForm(form: AppLabelFormGroup, appLabel: AppLabelFormGroupInput): void {
    const appLabelRawValue = { ...this.getFormDefaults(), ...appLabel };
    form.reset(
      {
        ...appLabelRawValue,
        id: { value: appLabelRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AppLabelFormDefaults {
    return {
      id: null,
    };
  }
}
