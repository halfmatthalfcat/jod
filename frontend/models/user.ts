/// <reference path="./models.d.ts" />

class User implements IUser {

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
    if(userId){
      this.userId = userId
    }
  }

}

export {User} ;
