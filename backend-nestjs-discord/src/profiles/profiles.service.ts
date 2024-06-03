import { Inject, Injectable } from '@nestjs/common';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileRepository } from 'src/shared/repositories/profile.repository';
import { Profile } from 'src/shared/schema/profile';

import { JwtService } from '@nestjs/jwt';
import { ProfileWithAccessToken } from './interfaces/profileWithAccesstoken.interface';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject(ProfileRepository) private readonly profileDB: ProfileRepository,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(
    req,
    res,
  ): Promise<{
    message: string;
    result: ProfileWithAccessToken | null;
    success: boolean;
  }> {
    try {
      if (!res.user) {
        return {
          success: true,
          message: 'No user from google',
          result: null,
        };
      } else {
        const userExist = await this.profileDB.findOne({
          email: req.user.email,
        });

        if (!userExist) {
          const newUser = await this.profileDB.create({
            name: req.user.name,
            imageUrl: req.user.imageUrl,
            email: req.user.email,
          });
          const token = await this.getTokens(newUser._id, newUser.email);

          // set refresh token to cookie
          res.cookie('refresh_token', token.refreshToken, {
            httpOnly: true,
            //secure: true,
            sameSite: 'none',
            path: 'api/v1/auth/refresh',

            maxAge: 24 * 60 * 60 * 1000,
          });
          return {
            success: true,
            message: 'signup successful',
            result: { profile: newUser, accessToken: token.accessToken },
          };
        }
        const token = await this.getTokens(userExist._id, userExist.email);

        // set refresh token to cookie
        res.cookie('refresh_token', token.refreshToken, {
          httpOnly: true,
          //secure: true,
          sameSite: 'none',
          path: 'api/v1/auth/refresh',

          maxAge: 24 * 60 * 60 * 1000,
        });
        return {
          success: true,
          message: 'login successful',
          result: { profile: userExist, accessToken: token.accessToken },
        };
      }
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all profiles`;
  }

  async findOne(id: string): Promise<{
    message: string;
    result: Profile;
    success: boolean;
  }> {
    try {
      const profile = await this.profileDB.findOne({ _id: id });
      return {
        message: 'Profile fetched successfully',
        result: profile,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }

  async logOut(res): Promise<{
    message: string;
    result: null;
    success: boolean;
  }> {
    try {
      res.clearCookie('refresh_token', {
        httpOnly: true,
        //secure: true,
        sameSite: 'none',
        path: 'api/v1/auth/refresh',

        maxAge: 24 * 60 * 60 * 1000,
      });

      return {
        message: 'Logged out!',
        result: null,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async getTokens(userId: string, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '1d',
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
