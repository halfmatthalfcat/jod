/// <reference path="./models.d.ts" />

class Budget implements IBudget {

  budgetId: number;
  accountId: number;
  budgetName: string;
  created: string;

  constructor(
    accountId: number,
    budgetName: string,
    created: string,
    budgetId?: number
  ) {
    this.accountId = accountId;
    this.budgetName = budgetName;
    this.created = created;
    if(budgetId) {
      this.budgetId = budgetId;
    }
  }

}

export {Budget};