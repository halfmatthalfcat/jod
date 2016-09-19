/// <reference path="./models.d.ts" />

import {IUserInfo} from "./models";

class UserInfo implements IUserInfo {

  firstName: string;
  lastName: string;
  userId: number;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: number;

  constructor(
    firstName: string,
    lastName: string,
    userId?: number,
    phone?: string,
    address1?: string,
    address2?: string,
    city?: string,
    state?: string,
    zipCode?: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    if (userId) this.userId = userId;
    if (phone) this.phone = phone;
    if (address1) this.address1 = address1;
    if (address2) this.address2 = address2;
    if (city) this.city = city;
    if (state) this.state = state;
    if (zipCode) this.zipCode = zipCode;
  }

}

export {UserInfo};