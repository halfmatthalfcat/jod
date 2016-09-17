export interface IAccount {

  accountId?: number;
  userId: number;
  accountName: string;

}

export interface IBudget {
  budgetId?: number;
  accountId: number;
  budgetName: string;
  created: string;
}

export interface IBudgetItem {

  budgetItemId?: number;
  budgetId: number;
  created: string;
  description: string;
  totalPrice: number;
  notes: string;
  tags: Array<ITag>;

}

export interface IUser {

  email: string;
  username: string;
  userId?: number;

}

export interface IUserInfo {
  userId?: number;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: number;
}

export interface ITag {
  tagId?: number;
  tagName: string;
  tagColor: string;
}
