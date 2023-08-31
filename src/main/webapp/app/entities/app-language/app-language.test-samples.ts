import { LanguageDirection } from 'app/entities/enumerations/language-direction.model';

import { IAppLanguage, NewAppLanguage } from './app-language.model';

export const sampleWithRequiredData: IAppLanguage = {
  id: 77962,
  name: 'Dollar',
  direction: LanguageDirection['LTR'],
};

export const sampleWithPartialData: IAppLanguage = {
  id: 23519,
  name: 'vertical',
  direction: LanguageDirection['LTR'],
};

export const sampleWithFullData: IAppLanguage = {
  id: 84294,
  name: 'hacking',
  direction: LanguageDirection['RTL'],
};

export const sampleWithNewData: NewAppLanguage = {
  name: 'Shoes Florida',
  direction: LanguageDirection['LTR'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
