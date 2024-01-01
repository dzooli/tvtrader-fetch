// Copyright (c) 2023 Zoltan Fabian
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceService } from './modules/price/price.service';
import { PriceController } from './modules/price/price.controller';
import { TypesModule } from './types/types.module';
import { PriceModule } from './modules/price/price.module';
import { HealthModule } from './modules/health/health.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    TypesModule,
    PriceModule,
    HealthModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController, PriceController],
  providers: [AppService, PriceService],
})
export class AppModule {}
