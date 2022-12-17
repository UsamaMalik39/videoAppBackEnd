import { AuthService } from './auth.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { signInDTO } from 'src/dto/users/userSignIn.dto';
import { signUpDTO } from 'src/dto/users/userSIgnUp.dto';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';

@Controller('auth')
export class AuthController {


    constructor(private _authService:AuthService){}

    @Post("create-new-user")
    async createUser(@Body() formData:signUpDTO, @Req() request: Request ){
        let hashedPassword=bcrypt.hashSync(formData.password,10)
        formData.email = formData.email.toLowerCase();
        let isEmailExisting = await this._authService.findOne(formData.email);
        if (isEmailExisting) {
            return 'This email is associated with another account';
        }
        else{
           let userData= await this._authService.signUpUser(formData,hashedPassword);
           return this._authService.returnUserWithToken(userData, request)
        }
    }

    @Post("login")
    async loginUser(@Body() formData:signInDTO, @Req() request: Request){
        formData.email = formData.email.toLowerCase();
        let user = await this._authService.validateUser(formData);
        if (typeof (user) == 'string') return user;
        return this._authService.returnUserWithToken(user, request)
    }
}
