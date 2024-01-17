import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({
  timestamps: true, //this adds createdAt and updatedAt fields in the db
  versionKey: false,
})
export class Message {
  @Prop({ required: true })
  name: string;

  @Prop({ index: true, unique: true, required: true })
  email: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  phone: string;


}

export const MessageSchema = SchemaFactory.createForClass(Message);
