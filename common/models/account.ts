/// <reference path="./models.d.ts" />

import {IAccount} from "./models";

class Account implements IAccount {

  accountId: number;
  userId: number;
  accountName: string;

  constructor(accountName: string,
              userId: number,
              accountId?: number) {
    this.accountName = accountName;
    this.userId = userId;
    if (accountId) {
      this.accountId = accountId;
    }
  }
}

export {Account};
