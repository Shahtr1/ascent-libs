import { ITestEntity, NewTestEntity } from './test-entity.model';

export const sampleWithRequiredData: ITestEntity = {
  id: 60484,
  name: 'payment Tennessee overriding',
};

export const sampleWithPartialData: ITestEntity = {
  id: 46259,
  name: 'Beauty Soap',
};

export const sampleWithFullData: ITestEntity = {
  id: 92668,
  name: 'Reverse-engineered Dynamic virtual',
};

export const sampleWithNewData: NewTestEntity = {
  name: 'Taiwan compressing sensor',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
