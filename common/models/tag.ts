/// <reference path="./models.d.ts" />

import {ITag} from "./models";

class Tag implements ITag {

  tagId: number;
  tagName: string;
  tagColor: string;
  tagTextColor: string;

  constructor(
    tagName: string,
    tagColor: string,
    tagTextColor: string,
    tagId?: number
  ) {
    if (tagId) this.tagId = tagId;
    this.tagName = tagName;
    this.tagColor = tagColor;
    this.tagTextColor = tagTextColor;
  }

}

export {Tag};