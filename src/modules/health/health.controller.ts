import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

/**
 * The /healthcheck endpoint handler
 */
@Controller({
  path: '/healthcheck',
  version: VERSION_NEUTRAL,
})
export class HealthController {
  constructor(
    private readonly configService: ConfigService,
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
  ) {}

  /**
   *
   * @returns A reponse with memory check. The heap limit is coming from the configuration file
   */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.memory.checkHeap(
          'memory_heap',
          this.configService.get<number>('server.heaplimit', 200) * 1024 * 1024,
        ),
    ]);
  }
}
