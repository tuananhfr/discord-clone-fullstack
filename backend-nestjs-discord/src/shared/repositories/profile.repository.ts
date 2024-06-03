import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from '../schema/profile';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  async findOne(query: any) {
    return await this.profileModel.findOne(query);
  }

  async find(query: any) {
    return await this.profileModel.find(query);
  }

  async create(data: Record<string, any>) {
    return await this.profileModel.create(data);
  }

  async updateOne(query: any, data: Record<string, any>) {
    return await this.profileModel.updateOne(query, data);
  }

  async findById(id: string) {
    return await this.profileModel.findById(id);
  }
}
