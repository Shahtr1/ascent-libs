export interface IAppProperties {
  id: number;
  uuid?: string | null;
  name?: string | null;
  value?: string | null;
  description?: string | null;
}

export type NewAppProperties = Omit<IAppProperties, 'id'> & { id: null };
