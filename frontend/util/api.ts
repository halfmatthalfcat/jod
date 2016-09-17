import { Ajax } from "./helpers";
import {IUser, IUserInfo, IAccount, IBudget, IBudgetItem, ITag} from "../../common/models/models";

namespace User {
  export function getUser(userId: number): JQueryPromise<IUser> {
    return Ajax.get<IUser>(`/api/user/${userId}`);
  }
  export function addUser(user: IUser): JQueryPromise<IUser> {
    return Ajax.post<IUser, IUser>("/api/user", user);
  }
  export function updateUser(user: IUser): JQueryPromise<IUser> {
    return Ajax.put<IUser, IUser>(`/api/user/${user.userId}`, user);
  }
  export function deleteUser(userId: number): JQueryPromise<Boolean> {
    return Ajax.del(`/api/user/${userId}`);
  }
  export function getAllUsers(): JQueryPromise<Array<IUser>> {
    return Ajax.get<Array<IUser>>("/api/user/all");
  }
}

namespace UserInfo {
  export function getUserInfo(userId: number): JQueryPromise<IUserInfo> {
    return Ajax.get<IUserInfo>(`/api/user/${userId}/info`);
  }
  export function addUserInfo(userInfo: IUserInfo): JQueryPromise<IUserInfo> {
    return Ajax.post<IUserInfo, IUserInfo>("/api/user/info", userInfo);
  }
  export function updateUserInfo(userInfo: IUserInfo): JQueryPromise<IUserInfo> {
    return Ajax.put<IUserInfo, IUserInfo>("/api/user/info", userInfo);
  }
  export function deleteUserInfo(userInfo: IUserInfo): JQueryPromise<IUserInfo> {
    throw new Error("Not implemented");
  }
}

namespace Account {
  export function getAccount(accountId: number): JQueryPromise<IAccount> {
    return Ajax.get<IAccount>(`/api/account/${accountId}`);
  }
  export function addAccount(account: IAccount): JQueryPromise<IAccount> {
    return Ajax.post<IAccount, IAccount>("/api/account", account);
  }
  export function updateAccount(account: IAccount): JQueryPromise<IAccount> {
    return Ajax.put<IAccount, IAccount>("/api/account", account);
  }
  export function deleteAccount(accountId: number): JQueryPromise<Boolean> {
    return Ajax.del(`/api/account/${accountId}`);
  }
  export function getAllAccounts(): JQueryPromise<Array<IAccount>> {
    return Ajax.get<Array<IAccount>>("/api/account/all");
  }
  export function getAccountBudgets(accountId: number): JQueryPromise<Array<IBudget>> {
    return Ajax.get<Array<IBudget>>(`/api/account/${accountId}/budgets`);
  }
}

namespace Budget {
  export function getBudget(budgetId: number): JQueryPromise<IBudget> {
    return Ajax.get<IBudget>(`/api/budget/${budgetId}`);
  }
  export function addBudget(budget: IBudget): JQueryPromise<IBudget> {
    return Ajax.post<IBudget, IBudget>("/api/budget", budget);
  }
  export function updateBudget(budget: IBudget): JQueryPromise<IBudget> {
    return Ajax.put<IBudget, IBudget>("/api/budget", budget);
  }
  export function deleteBudget(budgetId: number): JQueryPromise<Boolean> {
    return Ajax.del(`/api/budget/${budgetId}`);
  }
  export function getBudgetItems(budgetId: number): JQueryPromise<Array<IBudgetItem>> {
    return Ajax.get<Array<IBudgetItem>>(`/api/budget/${budgetId}/items`);
  }
}

namespace BudgetItem {
  export function getBudgetItem(budgetItemId: number): JQueryPromise<IBudgetItem> {
    return Ajax.get<IBudgetItem>(`/api/budget/item/${budgetItemId}`);
  }
  export function addBudgetItem(budgetItem: IBudgetItem): JQueryPromise<IBudgetItem> {
    return Ajax.post<IBudgetItem, IBudgetItem>("/api/budget/item", budgetItem);
  }
  export function updateBudgetItem(budgetItem: IBudgetItem): JQueryPromise<IBudgetItem> {
    return Ajax.put<IBudgetItem, IBudgetItem>("/api/budget/item", budgetItem);
  }
  export function deleteBudgetItem(budgetItemId: number): JQueryPromise<Boolean> {
    return Ajax.del(`/api/budget/item/${budgetItemId}`);
  }
  export function addTagToBudgetItem(budgetItemId: number, tagId: number): JQueryPromise<IBudgetItem> {
    return Ajax.get<IBudgetItem>(`/api/budget/item/${budgetItemId}/tag/${tagId}`);
  }
  export function removeTagFromBudgetItem(budgetItemId: number, tagId: number): JQueryPromise<Boolean> {
    return Ajax.del(`/api/budget/item/${budgetItemId}/tag/${tagId}`);
  }
}

namespace Tag {
  export function getTag(tagId: number): JQueryPromise<ITag> {
    return Ajax.get<ITag>(`/api/tag/${tagId}`);
  }
  export function addTag(tag: ITag): JQueryPromise<ITag> {
    return Ajax.post<ITag, ITag>("/api/tag", tag);
  }
  export function updateTag(tag: ITag): JQueryPromise<ITag> {
    return Ajax.put<ITag, ITag>("/api/tag", tag);
  }
  export function deleteTag(tagId: number): JQueryPromise<Boolean> {
    return Ajax.del(`/api/tag/${tagId}`);
  }
  export function getAllTags(): JQueryPromise<Array<ITag>> {
    return Ajax.get<Array<ITag>>("/api/tag/all");
  }
}