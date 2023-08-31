import { IAppLanguage } from 'app/entities/app-language/app-language.model';

export interface IAppLabel {
  id: number;
  uuid?: string | null;
  value?: string | null;
  language?: Pick<IAppLanguage, 'id'> | null;
}

export type NewAppLabel = Omit<IAppLabel, 'id'> & { id: null };
