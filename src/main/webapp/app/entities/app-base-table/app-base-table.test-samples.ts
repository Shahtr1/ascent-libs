import { IAppBaseTable, NewAppBaseTable } from './app-base-table.model';

export const sampleWithRequiredData: IAppBaseTable = {
  id: 75111,
  uuid: 'cross-platform',
  viewConfig: '../fake-data/blob/hipster.txt',
};

export const sampleWithPartialData: IAppBaseTable = {
  id: 75854,
  uuid: 'USB Nebraska',
  viewConfig: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IAppBaseTable = {
  id: 89876,
  uuid: 'Health Lodge Unbranded',
  viewConfig: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewAppBaseTable = {
  uuid: 'hour',
  viewConfig: '../fake-data/blob/hipster.txt',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
