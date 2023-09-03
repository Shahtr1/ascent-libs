import { IAppLabel, NewAppLabel } from './app-label.model';

export const sampleWithRequiredData: IAppLabel = {
  id: 65567,
  key: 'deposit',
  value: 'Electronics',
};

export const sampleWithPartialData: IAppLabel = {
  id: 98765,
  key: 'generate',
  value: 'Clothing',
};

export const sampleWithFullData: IAppLabel = {
  id: 2204,
  key: 'focus override',
  value: 'generating Denmark',
};

export const sampleWithNewData: NewAppLabel = {
  key: 'Investor',
  value: 'parse',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
