/// <reference path="./models.d.ts" />

import {IBudget} from "./models";

class Budget implements IBudget {

  budgetId: number;
  userId: number;
  budgetName: string;
  created: string;

  constructor(
    userId: number,
    budgetName: string,
    created?: string,
    budgetId?: number
  ) {
    this.userId = userId;
    this.budgetName = budgetName;
    if (created) this.created = created;
    if (budgetId) this.budgetId = budgetId;
  }

}

export {Budget};