// Copyright (c) 2023 Zoltan Fabian
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceService } from './modules/price/price.service';
import { PriceController } from './modules/price/price.controller';
import { TypesModule } from './types/types.module';
import { PriceModule } from './modules/price/price.module';

@Module({
  imports: [TypesModule, PriceModule],
  controllers: [AppController, PriceController],
  providers: [AppService, PriceService],
})
export class AppModule {}
