import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class isAuthGuard implements CanActivate {
  constructor(private readonly profilesService: ProfilesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Please provide token');
      }
      const authToken = authHeader.split(' ')[1];
      const resp = await this.profilesService.validateAccessToken(authToken);
      request.decodedData = resp;
      return true;
    } catch (error) {
      console.log('auth error - ', error.message);
      throw new ForbiddenException(
        error.message || 'session expired! Please sign In',
      );
    }
  }
}
