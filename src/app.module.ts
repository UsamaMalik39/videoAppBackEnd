import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './shared/services/config/config.service';
import { QueryService } from './shared/services/query/query.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpInterceptor } from './interceptors/httpinterceptor/http.interceptor';

@Module({
  imports: [
    UsersModule,
    DashboardModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule,],
      useFactory: (configService: ConfigService) =>
        configService.typeOrmConfig,
      inject: [ConfigService],
    }),  ],
  controllers: [AppController],
  providers:[AppService, QueryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    }],
})
export class AppModule {}
