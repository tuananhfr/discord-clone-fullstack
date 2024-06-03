import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Server } from './server';

import { Member } from './member';
import { Channel } from './channel';

@Schema({
  timestamps: true,
})
export class Profile extends Document {
  @Prop()
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  email: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Server' }])
  server: Server[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }])
  member: Member[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }])
  channels: Channel[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
