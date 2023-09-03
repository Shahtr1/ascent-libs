import { IAppProperties, NewAppProperties } from './app-properties.model';

export const sampleWithRequiredData: IAppProperties = {
  id: 44916,
  uuid: 'Specialist matrix',
  name: 'payment Granite Licensed',
  value: 'Savings Toys Licensed',
};

export const sampleWithPartialData: IAppProperties = {
  id: 69902,
  uuid: 'Plastic Plastic RAM',
  name: 'Diverse ability',
  value: 'Strategist pink invoice',
  description: 'overriding Home sensor',
};

export const sampleWithFullData: IAppProperties = {
  id: 29412,
  uuid: 'EXE',
  name: 'redundant Plastic',
  value: 'maximize foreground',
  description: 'Enhanced Multi-tiered',
};

export const sampleWithNewData: NewAppProperties = {
  uuid: 'Planner withdrawal Phased',
  name: 'Maine Helena',
  value: 'Account open-source Games',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
