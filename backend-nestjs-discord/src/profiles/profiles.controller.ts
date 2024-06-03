import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
  Redirect,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';

import { UpdateProfileDto } from './dto/update-profile.dto';

import { Response } from 'express';

import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    res.redirect('http://localhost:3000');
    return this.profilesService.googleLogin(req, res);
  }

  @Get('/logout')
  logOut(@Res() res) {
    return this.profilesService.logOut(res);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
