/// <reference path="./models.d.ts" />

class UserInfo implements IUserInfo {

  userId: number;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: number;

  constructor(
    userId?: number,
    phone?: string,
    address1?: string,
    address2?: string,
    city?: string,
    state?: string,
    zipCode?: number
  ) {
    if(userId) this.userId = userId;
    if(phone) this.phone = phone;
    if(address1) this.address1 = address1;
    if(address2) this.address2 = address2;
    if(city) this.city = city;
    if(state) this.state = state;
    if(zipCode) this.zipCode = zipCode;
  }

}

export {UserInfo};