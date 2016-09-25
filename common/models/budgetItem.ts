/// <reference path="./models.d.ts" />

import {IBudgetItem, ITag} from "./models";

class BudgetItem implements IBudgetItem {

  budgetItemId: number;
  budgetId: number;
  created: string;
  invoiced: string;
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
    budgetItemId?: number,
    invoiced?: string
  ) {
    if (budgetItemId) this.budgetItemId = budgetItemId;
    if (invoiced) this.invoiced = invoiced;
    if (tags) this.tags = tags;
    this.budgetId = budgetId;
    this.created = created;
    this.description = description;
    this.totalPrice = totalPrice;
    this.notes = notes;
  }

}

export {BudgetItem};
