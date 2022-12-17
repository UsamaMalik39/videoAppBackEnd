import { DashboardService } from './dashboard.service';
import { Body, Controller, Get, Req, UseGuards, UseInterceptors, Post } from '@nestjs/common';
import { AuthGuardJWT } from 'src/guards/auth.guard';
import { AuthUserInterceptorService } from 'src/interceptors/auth-user-interceptor/auth-user-interceptor.service';
import { Request } from 'express';
import { newCommentDTO } from 'src/dto/comment/comment.dto';

@Controller('dashboard')
@UseGuards(AuthGuardJWT)
export class DashboardController {

    constructor(private _dashboardService:DashboardService){}

    @Get("get-dashboard-data")
    async getDashboardData( @Req() request: Request){
        let searchString = null;
        let genreID = null;
        if(request?.query?.searchString)
            searchString=request?.query?.searchString
        if(request?.query?.genreID )
            genreID=request?.query?.genreID
       return await this._dashboardService.getDashboardData(searchString,genreID)
    }

    @Get("get-video-data")
    async getVideoData( @Req() request: Request){
        let videoID = null;
        if(request?.query?.videoID)
            videoID=request?.query?.videoID
       return await this._dashboardService.getVideoData(videoID,request)
    }

    @Get("get-genre-list")
    async getGenreList( @Req() request: Request){
       return await this._dashboardService.getGenreList(request)
    }

    @Post("add-new-comment")
    async addNewComment(@Body() formData:newCommentDTO, @Req() request: Request){
       return await this._dashboardService.addNewComment(formData,request)
    }

}
