/// <reference path="./models.d.ts" />

import {IImage} from "./models";

class Image implements IImage {

  imageId: number;
  key: string;
  s3Url: string;
  description: string;

  constructor(
    imageId: number,
    key: string,
    s3Url: string,
    description?: string
  ) {
    this.imageId = imageId;
    this.key = key;
    this.s3Url = s3Url;
    if(description) this.description = description;
  }

}

export {Image};