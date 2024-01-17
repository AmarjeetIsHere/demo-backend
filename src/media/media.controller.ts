import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { MediaService } from './media.service';

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
    console.log(body);
    return await this.mediaService.addMessage(body);
  }

  @Get('messages')
  async getMessages() {
    return await this.mediaService.getMessages({});
  }
}
