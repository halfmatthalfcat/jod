import { Ajax } from "./helpers";
import {IUser, IUserInfo, IBudget, IBudgetItem, ITag, IFullUser, ITagGroup} from "../../common/models/models";

export namespace App {
  export function requestLogin(email: string): Promise<boolean> {
    return Ajax.get<boolean>(`/request/${email}`);
  }
  export function validate(token: string): Promise<IUser> {
    return Ajax.get<IUser>(`/validate/${token}`);
  }
}

export namespace User {
  export function getUser(userId: number): Promise<IUser> {
    return Ajax.get<IUser>(`/api/user/${userId}`);
  }
  export function addUser(user: IUser): Promise<IUser> {
    return Ajax.post<IUser, IUser>("/api/user", user);
  }
  export function updateUser(user: IUser): Promise<IUser> {
    return Ajax.put<IUser, IUser>("/api/user", user);
  }
  export function deleteUser(userId: number): Promise<void> {
    return Ajax.del(`/api/user/${userId}`);
  }
  export function getAllUsers(): Promise<Array<IUser>> {
    return Ajax.get<Array<IUser>>("/api/user/all");
  }
  export function getAllUsersFull(): Promise<Array<IFullUser>> {
    return Ajax.get<Array<IFullUser>>("/api/user/all/full");
  }
  export function getUserBudgets(userId: number): Promise<Array<IBudget>> {
    return Ajax.get<Array<IBudget>>(`/api/user/${userId}/budget`);
  }
}

export namespace UserInfo {
  export function getUserInfo(userId: number): Promise<IUserInfo> {
    return Ajax.get<IUserInfo>(`/api/user/${userId}/info`);
  }
  export function addUserInfo(userInfo: IUserInfo): Promise<IUserInfo> {
    return Ajax.post<IUserInfo, IUserInfo>("/api/user/info", userInfo);
  }
  export function updateUserInfo(userInfo: IUserInfo): Promise<IUserInfo> {
    return Ajax.put<IUserInfo, IUserInfo>("/api/user/info", userInfo);
  }
  export function deleteUserInfo(userInfo: IUserInfo): Promise<IUserInfo> {
    throw new Error("Not implemented");
  }
}

export namespace BudgetApi {
  export function getBudget(budgetId: number): Promise<IBudget> {
    return Ajax.get<IBudget>(`/api/budget/${budgetId}`);
  }
  export function addBudget(budget: IBudget): Promise<IBudget> {
    return Ajax.post<IBudget, IBudget>("/api/budget", budget);
  }
  export function updateBudget(budget: IBudget): Promise<IBudget> {
    return Ajax.put<IBudget, IBudget>("/api/budget", budget);
  }
  export function deleteBudget(budgetId: number): Promise<void> {
    return Ajax.del(`/api/budget/${budgetId}`);
  }
  export function getBudgetItems(budgetId: number): Promise<Array<IBudgetItem>> {
    return Ajax.get<Array<IBudgetItem>>(`/api/budget/${budgetId}/items`);
  }
  export function generateBudget(budgetId: number, budgetItems: Array<IBudgetItem>): Promise<Blob> {
    return Ajax.download<Array<IBudgetItem>>(
      `/api/budget/${budgetId}/budget`,
      budgetItems
    );
  }
  export function generateInvoice(budgetId: number, budgetItems: Array<IBudgetItem>): Promise<Blob> {
    return Ajax.download<Array<IBudgetItem>>(
      `/api/budget/${budgetId}/invoice`,
      budgetItems
    );
  }
}

export namespace BudgetItem {
  export function getBudgetItem(budgetItemId: number): Promise<IBudgetItem> {
    return Ajax.get<IBudgetItem>(`/api/budget/item/${budgetItemId}`);
  }
  export function addBudgetItem(budgetItem: IBudgetItem): Promise<IBudgetItem> {
    return Ajax.post<IBudgetItem, IBudgetItem>("/api/budget/item", budgetItem);
  }
  export function updateBudgetItem(budgetItem: IBudgetItem): Promise<IBudgetItem> {
    return Ajax.put<IBudgetItem, IBudgetItem>("/api/budget/item", budgetItem);
  }
  export function deleteBudgetItem(budgetItemId: number): Promise<void> {
    return Ajax.del(`/api/budget/item/${budgetItemId}`);
  }
  export function addTagToBudgetItem(budgetItemId: number, tagId: number): Promise<any> {
    return Ajax.post<any, any>(`/api/budget/item/${budgetItemId}/tag/${tagId}`, {});
  }
  export function removeTagFromBudgetItem(budgetItemId: number, tagId: number): Promise<void> {
    return Ajax.del(`/api/budget/item/${budgetItemId}/tag/${tagId}`);
  }
}

export namespace Tag {
  export function getTag(tagId: number): Promise<ITag> {
    return Ajax.get<ITag>(`/api/tag/${tagId}`);
  }
  export function addTag(tagGroupId: number, tag: ITag): Promise<ITag> {
    return Ajax.post<ITag, ITag>(`/api/tag/group/${tagGroupId}`, tag);
  }
  export function updateTag(tagGroupId: number, tag: ITag): Promise<ITag> {
    return Ajax.put<ITag, ITag>(`/api/tag/group/${tagGroupId}`, tag);
  }
  export function deleteTag(tagId: number): Promise<void> {
    return Ajax.del(`/api/tag/${tagId}`);
  }
  export function getAllTags(): Promise<Array<ITag>> {
    return Ajax.get<Array<ITag>>("/api/tag/all");
  }
  export function getAllTagGroups(): Promise<Array<ITagGroup>> {
    return Ajax.get<Array<ITagGroup>>("/api/tag/group/all");
  }
  export function addTagGroup(tagGroup: ITagGroup): Promise<ITagGroup> {
    return Ajax.post<ITagGroup, ITagGroup>("/api/tag/group", tagGroup);
  }
  export function updateTagGroup(tagGroup: ITagGroup): Promise<ITagGroup> {
    return Ajax.put<ITagGroup, ITagGroup>("/api/tag/group", tagGroup);
  }
  export function updateTagToTagGroup(tagGroupId: number, tagId: number): Promise<any> {
    return Ajax.put<any, any>(`/api/tag/group/${tagGroupId}/tag/${tagId}`, {});
  }
}