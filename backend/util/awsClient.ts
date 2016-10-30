import {S3} from "aws-sdk";

class AWSClient {

  private s3: S3;
  private bucket: string;

  constructor(config: any, bucket: string) {
    this.s3 = new S3({
      accessKeyId: config.s3.accessKeyId,
      secretAccessKey: config.s3.secretAccessKey,
      region: config.s3.region
    });
    this.bucket = bucket;
  }

  public putImage(key: string, image: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.s3.upload({
        Bucket: this.bucket,
        Key: `${key}.jpg`,
        Body: new Buffer(image, "base64"),
        ACL: "public-read"
      }, (err, data) => {
        if (err) reject(err);
        else resolve(data.Location);
      })
    });
  }

  public deleteImage(key: string): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject({
        Bucket: this.bucket,
        Key: `${key}.jpg`
      }, (err, data) => {
        if (err) reject();
        else resolve();
      })
    })
  }

  public getImage(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.s3.getObject({
        Bucket: this.bucket,
        Key: key
      }, (err, data) => {
        if (err) reject(err);
        else resolve(data.Body.toString("base64"));
      })
    })
  }

}

export {AWSClient};