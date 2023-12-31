// Copyright (c) 2023 Zoltan Fabian
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return 'Pong from Tv2Influx!';
  }
}
