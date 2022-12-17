import { UsersService } from './users.service';
import { Body, Controller, Get, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { signUpDTO } from 'src/dto/users/userSIgnUp.dto';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { signInDTO } from 'src/dto/users/userSignIn.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/shared/services/files/files.service';
import { newVideoDTO } from 'src/dto/users/newVideo.dto';
import { AuthGuardJWT } from 'src/guards/auth.guard';


@Controller('users')
@UseGuards(AuthGuardJWT)

export class UsersController {

    constructor(private _userService:UsersService, private fileService:FileService){}


    @Post('upload')
    @UseInterceptors(AnyFilesInterceptor())
    @ApiConsumes('multipart/form-data')
    async uploadFile(@UploadedFiles() file: Express.Multer.File[]) {
        const containerName = 'videoandthumbnailscontainer'; 
        let videoFile=file[0]
        const upload = await this.fileService.uploadFile(videoFile, containerName) 

        let thumbnail=file[1]
        const thumbnailURL = await this.fileService.uploadFile(thumbnail, containerName) 
        return {dataURL:upload , thumbnailURL }

    }

    @Post('addURL')
    async addURL(@Body() formData:newVideoDTO, @Req() request: Request ) {
        return await this._userService.addVideo(formData,request)
    }


}
