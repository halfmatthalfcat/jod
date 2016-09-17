import { Ajax } from './Helpers';

export module User {
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
}