import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/shared/schema/profile';
import { ProfileRepository } from 'src/shared/repositories/profile.repository';
import { GoogleStrategy } from './utils/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './utils/accessToken.strategy';
import { RefreshTokenStrategy } from './utils/refreshToken.strategy';

@Module({
  controllers: [ProfilesController],
  providers: [
    ProfilesService,
    ProfileRepository,
    GoogleStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Profile.name,
        schema: ProfileSchema,
      },
    ]),
    PassportModule,
    JwtModule.register({}),
  ],
})
export class ProfilesModule {}
