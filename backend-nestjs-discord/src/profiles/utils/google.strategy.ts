import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { ProfilesService } from '../profiles.service';
import { ProfileRepository } from 'src/shared/repositories/profile.repository';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.ID_CLIENT_OAUTH,
      clientSecret: process.env.SECRET_CLIENT_OAUTH,
      callbackURL: process.env.URL_REDIRECT_OAUTH,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      name: name.givenName + ' ' + name.familyName,
      imageUrl: photos[0].value,
    };
    done(null, user);
  }
}
