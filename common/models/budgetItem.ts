/// <reference path="./models.d.ts" />

import {IBudgetItem, ITag} from "./models";

class BudgetItem implements IBudgetItem {

  budgetItemId: number;
  budgetId: number;
  created: string;
  description: string;
  totalPrice: number;
  notes: string;
  tags: Array<ITag>;


  constructor(
    budgetId: number,
    created: string,
    description: string,
    totalPrice: number,
    notes: string,
    tags?: Array<ITag>,
    budgetItemId?: number
  ) {
    if (budgetItemId) this.budgetItemId = budgetItemId;
    this.budgetId = budgetId;
    this.created = created;
    this.description = description;
    this.totalPrice = totalPrice;
    this.notes = notes;
    this.tags = tags;
  }

}

export {BudgetItem};
