import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Profile } from './profile';
import { Member } from './member';
import { Channel } from './channel';

@Schema({
  timestamps: true,
})
export class Server extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  inviteCode: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profileId: Profile;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }])
  members: Member[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }])
  channels: Channel[];
}

export const ServerSchema = SchemaFactory.createForClass(Server);
