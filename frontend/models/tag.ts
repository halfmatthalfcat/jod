/// <reference path="./models.d.ts" />

class Tag implements ITag {

  tagId: number;
  tagName: string;
  tagColor: string;

  constructor(
    tagName: string,
    tagColor: string,
    tagId?: number
  ) {
    if(tagId) this.tagId = tagId;
    this.tagName = tagName;
    this.tagColor = tagColor;
  }

}

export {Tag};