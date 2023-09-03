import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAppProperties, NewAppProperties } from '../app-properties.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAppProperties for edit and NewAppPropertiesFormGroupInput for create.
 */
type AppPropertiesFormGroupInput = IAppProperties | PartialWithRequiredKeyOf<NewAppProperties>;

type AppPropertiesFormDefaults = Pick<NewAppProperties, 'id'>;

type AppPropertiesFormGroupContent = {
  id: FormControl<IAppProperties['id'] | NewAppProperties['id']>;
  uuid: FormControl<IAppProperties['uuid']>;
  name: FormControl<IAppProperties['name']>;
  value: FormControl<IAppProperties['value']>;
  description: FormControl<IAppProperties['description']>;
};

export type AppPropertiesFormGroup = FormGroup<AppPropertiesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AppPropertiesFormService {
  createAppPropertiesFormGroup(appProperties: AppPropertiesFormGroupInput = { id: null }): AppPropertiesFormGroup {
    const appPropertiesRawValue = {
      ...this.getFormDefaults(),
      ...appProperties,
    };
    return new FormGroup<AppPropertiesFormGroupContent>({
      id: new FormControl(
        { value: appPropertiesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      uuid: new FormControl(appPropertiesRawValue.uuid, {
        validators: [Validators.required],
      }),
      name: new FormControl(appPropertiesRawValue.name, {
        validators: [Validators.required],
      }),
      value: new FormControl(appPropertiesRawValue.value, {
        validators: [Validators.required],
      }),
      description: new FormControl(appPropertiesRawValue.description),
    });
  }

  getAppProperties(form: AppPropertiesFormGroup): IAppProperties | NewAppProperties {
    return form.getRawValue() as IAppProperties | NewAppProperties;
  }

  resetForm(form: AppPropertiesFormGroup, appProperties: AppPropertiesFormGroupInput): void {
    const appPropertiesRawValue = { ...this.getFormDefaults(), ...appProperties };
    form.reset(
      {
        ...appPropertiesRawValue,
        id: { value: appPropertiesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AppPropertiesFormDefaults {
    return {
      id: null,
    };
  }
}
