export interface IAccount {

  accountId?: number;
  userId: number;
  accountName: string;

}

export interface IBudget {
  budgetId?: number;
  userId: number;
  budgetName: string;
  created?: string;
}

export interface IBudgetItem {

  budgetItemId?: number;
  budgetId: number;
  created: string;
  invoiced: string;
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
  firstName: string;
  lastName: string;
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
  tagTextColor: string;
}

export interface ITagGroup {
  tagGroupId?: number;
  tagGroupName: string;
  tags: Array<ITag>;
}

export interface IFullUser {
  user: IUser;
  userInfo: IUserInfo;
}

export interface IImage {
  imageId?: number;
  key?: string;
  s3Url?: string;
  description?: string;
  image?: string;
}

export interface IStatItem {
  year: number;
  month: number;
  total: number;
}