// import { AuthGuardJWT as NestAuthGuardJWT } from '@nestjs/passport';

// export const AuthGuardJWT = NestAuthGuardJWT('jwt');


import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class AuthGuardJWT extends AuthGuard('jwt') {}