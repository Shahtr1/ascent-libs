export interface ITestEntity {
  id: number;
  name?: string | null;
}

export type NewTestEntity = Omit<ITestEntity, 'id'> & { id: null };
