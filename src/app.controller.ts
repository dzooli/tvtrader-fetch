// Copyright (c) 2023 Zoltan Fabian
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller({
  version: VERSION_NEUTRAL,
})
@ApiTags('default')
@ApiResponse({
  status: 'default',
  description: 'Valid response, server is available',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
