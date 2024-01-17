import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from 'src/schema/contactus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'message', schema: MessageSchema }]),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
