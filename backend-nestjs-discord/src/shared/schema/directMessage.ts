import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Member } from './member';
import { Conversation } from './conversation';

@Schema({
  timestamps: true,
})
export class DirectMessage extends Document {
  @Prop()
  content: string;

  @Prop()
  fileUrl?: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  memberId: Member;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' })
  conversationId: Conversation;

  @Prop({ default: false })
  deleted: boolean;
}

export const DirectMessageSchema = SchemaFactory.createForClass(DirectMessage);
