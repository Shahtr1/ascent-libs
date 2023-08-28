import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITestEntity, NewTestEntity } from '../test-entity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITestEntity for edit and NewTestEntityFormGroupInput for create.
 */
type TestEntityFormGroupInput = ITestEntity | PartialWithRequiredKeyOf<NewTestEntity>;

type TestEntityFormDefaults = Pick<NewTestEntity, 'id'>;

type TestEntityFormGroupContent = {
  id: FormControl<ITestEntity['id'] | NewTestEntity['id']>;
  name: FormControl<ITestEntity['name']>;
};

export type TestEntityFormGroup = FormGroup<TestEntityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TestEntityFormService {
  createTestEntityFormGroup(testEntity: TestEntityFormGroupInput = { id: null }): TestEntityFormGroup {
    const testEntityRawValue = {
      ...this.getFormDefaults(),
      ...testEntity,
    };
    return new FormGroup<TestEntityFormGroupContent>({
      id: new FormControl(
        { value: testEntityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(testEntityRawValue.name, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
    });
  }

  getTestEntity(form: TestEntityFormGroup): ITestEntity | NewTestEntity {
    return form.getRawValue() as ITestEntity | NewTestEntity;
  }

  resetForm(form: TestEntityFormGroup, testEntity: TestEntityFormGroupInput): void {
    const testEntityRawValue = { ...this.getFormDefaults(), ...testEntity };
    form.reset(
      {
        ...testEntityRawValue,
        id: { value: testEntityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TestEntityFormDefaults {
    return {
      id: null,
    };
  }
}
