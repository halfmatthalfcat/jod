/// <reference path="./models.d.ts" />

import {IStatItem} from "./models";

class StatItem implements IStatItem {
  year: number;
  month: number;
  total: number;

  constructor(
    year: number,
    month: number,
    total: number
  ) {
    this.year = year;
    this.month = month;
    this.total = total;
  }
}

export {StatItem};