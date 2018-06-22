import { Get, Controller, Req, Res, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {Manufacturer } from '../models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }
  @Get('/route')
  roots(): string {
    return this.appService.someRoute();
  }

  @Post('/test')
  test(@Req() req): string {
    Manufacturer.create({name: 'hello'});
    return 'hello test';
  }

}
