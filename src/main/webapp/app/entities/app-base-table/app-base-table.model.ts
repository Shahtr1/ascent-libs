export interface IAppBaseTable {
  id: number;
  name?: string | null;
  viewConfig?: string | null;
}

export type NewAppBaseTable = Omit<IAppBaseTable, 'id'> & { id: null };
