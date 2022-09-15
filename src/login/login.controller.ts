import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  checkLogin(@Body('zid') zid: string, @Body('password') password: string) {
    return this.loginService.checkLogin(zid, password);
  }
}
