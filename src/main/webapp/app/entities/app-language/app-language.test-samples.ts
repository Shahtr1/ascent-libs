import { LanguageDirection } from 'app/entities/enumerations/language-direction.model';

import { IAppLanguage, NewAppLanguage } from './app-language.model';

export const sampleWithRequiredData: IAppLanguage = {
  id: 77962,
  uuid: 'Dollar',
  name: 'Fully-configurable Ergonomic',
  direction: LanguageDirection['RTL'],
};

export const sampleWithPartialData: IAppLanguage = {
  id: 18471,
  uuid: 'Money',
  name: 'Customer RSS reinvent',
  direction: LanguageDirection['LTR'],
};

export const sampleWithFullData: IAppLanguage = {
  id: 33984,
  uuid: 'eyeballs',
  name: 'Berkshire Towels',
  direction: LanguageDirection['RTL'],
};

export const sampleWithNewData: NewAppLanguage = {
  uuid: 'Creative',
  name: 'Representative',
  direction: LanguageDirection['LTR'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
