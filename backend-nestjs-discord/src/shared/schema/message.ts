import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Member } from './member';
import { Channel } from './channel';

@Schema({
  timestamps: true,
})
export class Message extends Document {
  @Prop()
  content: string;

  @Prop()
  fileUrl?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  memberId: Member;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' })
  channelId: Channel;

  @Prop({ default: false })
  deleted: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
