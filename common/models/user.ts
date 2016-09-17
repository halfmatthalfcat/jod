/// <reference path="./models.d.ts" />

import {IUser} from "./models";

export class User implements IUser {

  userId: number;
  username: string;
  email: string;

  constructor(
    username: string,
    email: string,
    userId?: number
  ) {
    this.username = username;
    this.email = email;
    if (userId) {
      this.userId = userId;
    }
  }

}