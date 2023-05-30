import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpsModule } from 'src/sign-ups/sign-ups.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy,],
  // {
  //   provide: APP_GUARD,
  //   useClass: JwtAuthGuard,
  // } put this in the providers array above
  imports: [
    SignUpsModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
