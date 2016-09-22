/// <reference path="./models.d.ts" />

import {ITagGroup, ITag} from "./models";

class TagGroup implements ITagGroup {

  public tagGroupId: number;
  public tagGroupName: string;
  public tags: Array<ITag>;

  constructor(
    tagGroupName: string,
    tagGroupId?: number,
    tags?: Array<ITag>
  ) {
    this.tagGroupName = tagGroupName;
    if(tagGroupId) this.tagGroupId = tagGroupId;
    if(tags) this.tags = tags;
  }

}

export {TagGroup};