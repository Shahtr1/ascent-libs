import { IClientAccount, NewClientAccount } from './client-account.model';

export const sampleWithRequiredData: IClientAccount = {
  id: 48063,
  refId: 'Metrics Inverse',
};

export const sampleWithPartialData: IClientAccount = {
  id: 41143,
  refId: 'Surinam',
  amount: 56005,
  isActive: false,
  isEnabled: false,
};

export const sampleWithFullData: IClientAccount = {
  id: 98703,
  refId: 'Jewelery Fantastic',
  shortname: 'Rapids Metal',
  middleName: 'Yen Western',
  trxnStatus: 'orchestrate Music',
  referenceName: 'neural Soft',
  amount: 98872,
  currency: 'Vanuatu Principal Avon',
  isActive: false,
  isEnabled: false,
};

export const sampleWithNewData: NewClientAccount = {
  refId: 'South',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
