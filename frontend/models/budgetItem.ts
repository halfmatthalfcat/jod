/// <reference path="./models.d.ts" />

class BudgetItem implements IBudgetItem {

  private persisted: boolean = false;

  budgetItemId: string;
  accountId: string;
  date: string;
  quantity: number;
  description: string;
  unitPrice: number;
  totalPrice: number;
  purpose: string;

  constructor(accountId: string,
              date: string,
              quantity: number,
              description: string,
              unitPrice: number,
              totalPrice: number,
              purpose: string,
              budgetItemId?: string) {
    if (budgetItemId) {
      this.budgetItemId = budgetItemId;
      this.persisted = true;
    }
    this.accountId = accountId;
    this.date = date;
    this.quantity = quantity;
    this.description = description;
    this.unitPrice = unitPrice;
    this.totalPrice = totalPrice;
    this.purpose = purpose;
  }

}

export {BudgetItem};
