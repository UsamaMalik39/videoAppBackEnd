import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports:[AuthModule],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}
