interface IAccount {

  accountId?: number,
  userId: number,
  accountName: string

}

interface IBudget {
  budgetId?: number,
  accountId: number,
  budgetName: string,
  created: string
}

interface IBudgetItem {

  budgetItemId?: number,
  budgetId: number,
  created: string,
  description: string,
  totalPrice: number,
  notes: string

}

interface IUser {

  email: string,
  username: string
  userId?: number

}

interface IUserInfo {
  userId?: number;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: number;
}

interface ITag {
  tagId?: number;
  tagName: string;
  tagColor: string;
}