import { Injectable } from '@nestjs/common';
import { signUpDTO } from 'src/dto/users/userSIgnUp.dto';
import { ConfigService } from 'src/shared/services/config/config.service';
import { QueryService } from 'src/shared/services/query/query.service';
import { getManager } from 'typeorm';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as uuid from 'uuid';
import * as bcrypt from 'bcryptjs';



@Injectable()
export class UsersService {

    constructor(private db:QueryService){}


    async addVideo(data:any,req){
        let userID=req.user.id
        let result= await this.db.insertUpdatDelete('call sp_add_new_video(?)',
        [[data.title,data.producer,data.genre,data.rating,userID,data.url,data.thumbnail,data.publisher]])
        return {message:'Successfully done'}
    }

}
