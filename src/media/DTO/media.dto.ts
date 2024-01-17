import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
export class mediaDto {
  @ApiProperty()
  mediaUrl: string;

  @ApiProperty()
  mediaName: string;

  @ApiProperty()
  @Optional()
  mediaThumbnail: string;
}
