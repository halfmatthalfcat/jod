/// <reference path="./models.d.ts" />

class Account implements IAccount{
    private persisted: boolean = false;
    
    accountId: string;
    accountName: string;
    password: string;
    firstName: string;
    lastName: string;
    streetNumber: number;
    streetName: string;
    city: string;
    state: string;
    zipCode: number;
    homePhone: string;
    cellPhone: string;
    email: string;
    notes: string;

    constructor(
        accountName: string,
        password: string,
        email: string,
        accountId?: string,
        firstName?: string,
        lastName?: string,
        streetNumber?: number,
        streetName?: string,
        city?: string,
        state?: string,
        zipCode?: number,
        homePhone?: string,
        cellPhone?: string,
        notes?: string
    ){
        this.accountName = accountName;
        this.password = password;
        this.email = email;
        if(accountId){
            this.accountId = accountId;
            this.persisted = true;
        }
        if(firstName) this.firstName = firstName;
        if(lastName) this.lastName = lastName;
        if(streetNumber) this.streetNumber = streetNumber;
        if(streetName) this.streetName = streetName;
        if(city) this.city = city;
        if(state) this.state = state;
        if(zipCode) this.zipCode = zipCode;
        if(homePhone) this.homePhone = homePhone;
        if(cellPhone) this.cellPhone = cellPhone;
        if(notes) this.notes = notes;
    }
}

export { Account };
