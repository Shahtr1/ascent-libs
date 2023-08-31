import { LanguageDirection } from 'app/entities/enumerations/language-direction.model';

export interface IAppLanguage {
  id: number;
  name?: string | null;
  direction?: LanguageDirection | null;
}

export type NewAppLanguage = Omit<IAppLanguage, 'id'> & { id: null };
