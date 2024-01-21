import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { Types } from 'mongoose';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  findAll(): string {
    return 'This action returns all media';
  }

  @Post('mediaUrl')
  async mediaPresignedUrl(@Body() body: any) {
    try {
      console.log(body);
      // let name = body.key.split('.').join('').split(' ')[0];
      // console.log(name);
      const Url = await this.mediaService.uploadVideoToS3(`${body.key}`);

      return { Url };
      // this.mediaService.uploadVideoToS3()
    } catch (error) {
      return error.message || error;
    }
  }
  @Post('getMedia')
  async getMedia(@Body() body: any) {
    try {
      console.log(body);
      return await this.mediaService.getMedia(body.key);
    } catch (error) {
      return error.message || error;
    }
  }

  @Post('contact')
  async createMessage(@Body() body: any) {
    try {
      console.log(body);
      const res = await this.mediaService.addMessage(body);
      console.log(res);
    } catch (error) {
      const errorMsg =
        error?.message?.indexOf('duplicate key error collection') > -1
          ? 'This email already has an associated message'
          : '';
      console.log(
        `API Error: createUser/post -`,
        errorMsg || error?.message || error,
      );
      throw new BadRequestException(errorMsg || error?.message || error);
    }
  }

  @Get('messages')
  async getMessages() {
    try {
      return await this.mediaService.getMessages({});
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async deleteMessages(@Param('id') id: any) {
    try {
      return await this.mediaService.deleteMessageById(new Types.ObjectId(id));
    } catch (error) {
      console.log(error);
    }
  }
}
