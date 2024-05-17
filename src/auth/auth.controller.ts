import {
  Controller,
  Get,
  Delete,
  UseGuards,
  Req,
  Put,
  Body,
  Post,
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
import { FirstLoginDto } from './dtos/first-login-dto';
import { AppleLoginDto } from './dtos/apple-login-dto';

@Controller('auth')
@ApiTags('인증 인가')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //최초 로그인시 유저 정보 받아오기.

  @UseGuards(AuthGuard('access'))
  @Post('/fill-user-info')
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
  @ApiResponse({ status: 200, description: '회원 탈퇴 성공' })
  @ApiOperation({
    summary: '회원탈퇴',
  })
  async deleteUser(@Req() req) {
    return await this.authService.deleteUser(req.user.id);
  }

  @UseGuards(AuthGuard('refresh'))
  @Get('/refresh')
  @ApiBearerAuth('Refresh Token')
  @ApiResponse({ status: 200, description: 'Access Token 재발급 성공' })
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

  // -------------------------- 애플 --------------------------------
  //애플 로그인
  @Post('/apple')
  @ApiOperation({
    summary: '애플 sign in',
  })
  @ApiResponse({ status: 201, description: '애플 로그인 성공' })
  @ApiResponse({ status: 999, description: '회원 가입 절차 끝나지 않음.' })
  async login(@Body() appleLoginDto: AppleLoginDto) {
    return this.authService.appleLogin(appleLoginDto.oAuthId);
  }
  //애플에서 유저가 "이메일 변경, 앱 서비스 해지, 애플 계정 탈퇴"를 했을 경우,
  //App ID apple sign in 에서 입력한 Endpoint URL로 유저 정보와 이벤트에 대한 PAYLOAD 데이터를 전송.
  @Post('/apple-endpoint')
  @ApiOperation({
    summary: '애플 유저 관련 공지 endpoint',
    description:
      '애플에서 유저가 "이메일 변경, 앱 서비스 해지, 애플 계정 탈퇴"를 했을 경우',
  })
  async endpoint() {
    //추후 논의 후 구현.
  }
}
