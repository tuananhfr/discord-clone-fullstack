import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Profile } from './profile';
import { Server } from './server';
import { Message } from './message';
import { DirectMessage } from './directMessage';
import { Conversation } from './conversation';
export enum memberTypes {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  GUEST = 'guest',
}
@Schema({
  timestamps: true,
})
export class Member extends Document {
  @Prop({ required: true, default: memberTypes.GUEST })
  role: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profileId: Profile;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Server' })
  serverId: Server;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }])
  messages: Message[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'DirectMessage' }])
  directMessages: DirectMessage[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }])
  conversationsInitiated: Conversation[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }])
  conversationsReceived: Conversation[];
}

export const MemberSchema = SchemaFactory.createForClass(Member);
