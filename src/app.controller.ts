// Copyright (c) 2023 Zoltan Fabian
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  version: VERSION_NEUTRAL,
})
@ApiTags('default')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
