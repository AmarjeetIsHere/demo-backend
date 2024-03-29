import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as AWS from 'aws-sdk';
import { Model, Types } from 'mongoose';
import { Message } from 'src/schema/contactus.schema';

@Injectable()
export class MediaService {
  private s3: AWS.S3;
  constructor(
    @InjectModel('message')
    private readonly messageModal: Model<Message>,
  ) {
    console.log(process.env.S3_BUCKET_NAME, process.env.AWS_ACCESS_KEY);
    this.s3 = new AWS.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
      region: process.env.AWS_REGION,
    });
  }

  async uploadVideoToS3(fileName: string): Promise<string> {
    // const params = {
    //   Bucket: process.env.S3_BUCKET_NAME,
    //   Key: fileName,
    //   Expires:60*60,

    // };

    // Upload video to S3
    // const uploadResponse = await this.s3.upload(params).promise();
    // console.log(uploadResponse);

    // Generate presigned URL

    const presignedUrl = this.s3.getSignedUrl('putObject', {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Expires: 60 * 60, // URL expiration time in seconds
    });
    console.log(presignedUrl);

    return presignedUrl;
  }

  async getMedia(filePath: string) {
    try {
      const Url = await this.s3.getSignedUrl('getObject', {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: filePath,
      });
      return { Url };
    } catch (error) {
      console.log(error);
    }
  }

  async addMessage(body) {
    try {
      return await this.messageModal.create(body);
    } catch (error) {
      console.log(error);
    }
  }

  async getMessages(body = {}) {
    try {
      return await this.messageModal.find({});
    } catch (error) {
      console.log(error);
    }
  }

  deleteMessageById(id) {
    try {
      return this.messageModal.findOneAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
