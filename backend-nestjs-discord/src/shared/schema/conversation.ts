import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Server } from './server';

import { Member } from './member';
import { Channel } from './channel';
import { DirectMessage } from './directMessage';

@Schema({
  timestamps: true,
})
export class Conversation extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  memberOne: Member;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  memberTwo: Member;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'DirectMessage' }])
  directMessages: DirectMessage[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
