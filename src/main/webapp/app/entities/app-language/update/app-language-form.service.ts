import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAppLanguage, NewAppLanguage } from '../app-language.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAppLanguage for edit and NewAppLanguageFormGroupInput for create.
 */
type AppLanguageFormGroupInput = IAppLanguage | PartialWithRequiredKeyOf<NewAppLanguage>;

type AppLanguageFormDefaults = Pick<NewAppLanguage, 'id'>;

type AppLanguageFormGroupContent = {
  id: FormControl<IAppLanguage['id'] | NewAppLanguage['id']>;
  uuid: FormControl<IAppLanguage['uuid']>;
  name: FormControl<IAppLanguage['name']>;
  direction: FormControl<IAppLanguage['direction']>;
};

export type AppLanguageFormGroup = FormGroup<AppLanguageFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AppLanguageFormService {
  createAppLanguageFormGroup(appLanguage: AppLanguageFormGroupInput = { id: null }): AppLanguageFormGroup {
    const appLanguageRawValue = {
      ...this.getFormDefaults(),
      ...appLanguage,
    };
    return new FormGroup<AppLanguageFormGroupContent>({
      id: new FormControl(
        { value: appLanguageRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      uuid: new FormControl(appLanguageRawValue.uuid, {
        validators: [Validators.required],
      }),
      name: new FormControl(appLanguageRawValue.name, {
        validators: [Validators.required],
      }),
      direction: new FormControl(appLanguageRawValue.direction, {
        validators: [Validators.required],
      }),
    });
  }

  getAppLanguage(form: AppLanguageFormGroup): IAppLanguage | NewAppLanguage {
    return form.getRawValue() as IAppLanguage | NewAppLanguage;
  }

  resetForm(form: AppLanguageFormGroup, appLanguage: AppLanguageFormGroupInput): void {
    const appLanguageRawValue = { ...this.getFormDefaults(), ...appLanguage };
    form.reset(
      {
        ...appLanguageRawValue,
        id: { value: appLanguageRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AppLanguageFormDefaults {
    return {
      id: null,
    };
  }
}
