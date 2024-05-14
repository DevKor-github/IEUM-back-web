import {
  Controller,
  Get,
  Delete,
  UseGuards,
  Req,
  Put,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiProperty,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FirstLoginDto } from './dtos/firstLogin-dto';

@Controller('auth')
@ApiTags('인증 인가')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //최초 로그인시 유저 정보 받아오기.

  @UseGuards(AuthGuard('access'))
  @Put('/fill-userInfo')
  @ApiBearerAuth('Access Token')
  @ApiResponse({ status: 201, description: '유저 정보 입력 성공' })
  @ApiOperation({
    summary: '최초 유저 정보 기입',
  })
  async fillUserInfo(@Body() firstLoginDto: FirstLoginDto, @Req() req) {
    return await this.authService.fillUserInfo(firstLoginDto, req.user.id);
  }

  @UseGuards(AuthGuard('access'))
  @Delete('/delete-user')
  //스웨거에서 header에 Access Token 담아서 보낸 것을 받기 위함.
  @ApiBearerAuth('Access Token')
  @ApiResponse({ status: 201, description: '회원 탈퇴 성공' })
  @ApiOperation({
    summary: '회원탈퇴',
  })
  async deleteUser(@Req() req) {
    return await this.authService.deleteUser(req.user.id);
  }

  @UseGuards(AuthGuard('refresh'))
  @Get('/new-access-token')
  @ApiBearerAuth('Refresh Token')
  @ApiResponse({ status: 201, description: 'Access Token 재발급 성공' })
  @ApiOperation({
    summary: 'Access Token 재발급',
  })
  //header 값 가져오는 데코레이터
  //header에 authorization 필드가 인증 정보를 가지고 있음.
  renewAccessToken(@Req() req) {
    return this.authService.newAccessToken(
      //passport 인증은 jwt에서 추출한 정보를 user 속성에 담는다!!!
      req.user.id,
      req.headers.authorization.substring(7),
    );
  }
}
