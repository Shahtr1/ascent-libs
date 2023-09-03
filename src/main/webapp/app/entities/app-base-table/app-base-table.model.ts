export interface IAppBaseTable {
  id: number;
  uuid?: string | null;
  viewConfig?: string | null;
}

export type NewAppBaseTable = Omit<IAppBaseTable, 'id'> & { id: null };
