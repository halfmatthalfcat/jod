/// <reference path="./models.d.ts" />

class User implements IUser {
    
    username: string;
    email: string;

    constructor(
        username: string,
        email: string        
    ){
        this.username = username;
        this.email = email;
    }
    
}

export { User } ;
