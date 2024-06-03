import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Server } from './server';
import { Message } from './message';
import { Profile } from './profile';
export enum channelTypes {
  TEXT = 'text',
  AUDIO = 'audio',
  VIDEO = 'video',
}
@Schema({
  timestamps: true,
})
export class Channel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: channelTypes.TEXT })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Server' })
  serverId: Server;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }])
  messages: Message[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profileId: Profile;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
