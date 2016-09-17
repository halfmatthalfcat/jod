interface IAccount {

  accountId?: string,
  accountName: string,
  password: string,
  firstName?: string,
  lastName?: string,
  streetNumber?: number,
  streetName?: string,
  city?: string,
  state?: string,
  zipCode?: number,
  homePhone?: string,
  cellPhone?: string,
  email: string,
  notes?: string

}

interface IBudgetItem {

  budgetItemId?: string,
  accountId: string,
  date: string,
  quantity: number,
  description: string,
  unitPrice: number,
  totalPrice: number,
  purpose: string

}

interface IUser {

  email: string,
  username: string
  userId?: number

}
