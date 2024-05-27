import { Controller, Post, Body, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { FirstLoginDto } from './dtos/first-login.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('유저 관련 api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //최초 로그인시 유저 정보 받아오기.
  @UseGuards(AuthGuard('access'))
  @Post('/fill-info')
  @ApiBearerAuth('Access Token')
  @ApiResponse({ status: 201, description: '유저 정보 입력 성공' })
  @ApiOperation({
    summary: '최초 유저 정보 기입',
  })
  async fillUserInfo(@Body() firstLoginDto: FirstLoginDto, @Req() req) {
    return await this.userService.fillUserInfo(firstLoginDto, req.user.id);
  }
}
