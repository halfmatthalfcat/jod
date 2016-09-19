/// <reference path="./models.d.ts" />

import {IFullUser, IUserInfo, IUser} from "./models";

class FullUser implements IFullUser {

  user: IUser;
  userInfo: IUserInfo;

  constructor(
    user: IUser,
    userInfo: IUserInfo
  ) {
    this.user = user;
    this.userInfo = userInfo;
  }

}

export {FullUser};