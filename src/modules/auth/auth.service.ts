import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { signUpDTO } from 'src/dto/users/userSIgnUp.dto';
import { ConfigService } from 'src/shared/services/config/config.service';
import { QueryService } from 'src/shared/services/query/query.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {


    constructor(private db:QueryService, private configService:ConfigService, private jwtService:JwtService){}

    async findOne(email:string){
        let isEmailExisting=await this.db.selectSingle('select * from users where email=?',[email])
        if(isEmailExisting)
            return isEmailExisting;
        else    
            return false;
    }

    async signUpUser(data:signUpDTO, hash:string){
        let isCreator=false;
        data.userType=='CREATOR' ? isCreator =true : isCreator=false;
        return this.db.selectSingle('call sp_create_new_user(?)',[[data.name,data.email,hash,isCreator]],true)
    }


    async returnUserWithToken(userEntity, request) {

        if (typeof (userEntity) == 'object') {

            const token = await this.createToken(userEntity, request);
            userEntity = token;

        }
        return userEntity;
    }

    async createToken(user, request): Promise<any> {
        return {
            expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
            accessToken: await this.jwtService.sign(
                {
                    id: user.id,
                    name: user.name,
                    isCreator: user.isCreator,
                    email: user.email
                }
            ),
        };
    }


    async validateUser(userLoginDto): Promise<any> {
        let { email, password } = userLoginDto
        const user:any = await this.findOne(email);
        if (typeof (user) == 'string') return user;
        if (Object.values(user).every(x => x === null)) {
            return "invalid username/password"
        }
        const isPasswordValid = await bcrypt.compareSync(password, user.password)

        if (!user || !isPasswordValid) {
            return 'Invalid user name or password';
        }
        return user;
    }

}
