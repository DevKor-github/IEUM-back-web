import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppleService } from './apple.service';
import { AuthGuard } from '@nestjs/passport';
import { AppleLoginDto } from './dtos/apple-login-dto';

@Controller('apple')
@ApiTags('애플 회원가입')
export class AppleController {
  constructor(private readonly appleService: AppleService) {}

  @Post('/login')
  @ApiOperation({
    summary: '애플 sign in',
  })
  @ApiResponse({ status: 201, description: '애플 로그인 성공' })
  async login(@Body() appleLoginDto: AppleLoginDto) {
    return this.appleService.appleLogin(appleLoginDto.authId);
  }
  //애플에서 유저가 "이메일 변경, 앱 서비스 해지, 애플 계정 탈퇴"를 했을 경우,
  //App ID apple sign in 에서 입력한 Endpoint URL로 유저 정보와 이벤트에 대한 PAYLOAD 데이터를 전송.
  @Post('/endpoint')
  @ApiOperation({
    summary: '애플 유저 관련 공지 endpoint',
    description:
      '애플에서 유저가 "이메일 변경, 앱 서비스 해지, 애플 계정 탈퇴"를 했을 경우',
  })
  async endpoint() {
    //추후 논의 후 구현.
  }
}
