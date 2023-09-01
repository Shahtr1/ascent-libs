export interface IClientAccount {
  id: number;
  refId?: string | null;
  shortname?: string | null;
  middleName?: string | null;
  trxnStatus?: string | null;
  referenceName?: string | null;
  amount?: number | null;
  currency?: string | null;
  isActive?: boolean | null;
  isEnabled?: boolean | null;
}

export type NewClientAccount = Omit<IClientAccount, 'id'> & { id: null };
