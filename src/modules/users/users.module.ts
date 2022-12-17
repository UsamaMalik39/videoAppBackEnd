import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/shared/services/config/config.service';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET_KEY"),
        signOptions: { expiresIn: '72000s' }
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService,JwtModule],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })]
})
export class UsersModule {}
