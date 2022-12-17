import { QueryService } from './../../shared/services/query/query.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {

    constructor(private db:QueryService){

    }

    async getDashboardData(searchString,genreID){
        searchString=='' ? searchString=null:searchString=searchString
        genreID=='0' ? genreID=null : genreID=genreID;
        let result= await this.db.select('call sp_get_dashboard_listing(?,?)',[genreID,searchString],true)
        if(result && result.length){
            result=result[0].videosData;
            result=JSON.parse(result)
            return result;
        }
        return []
    }
    async getGenreList(req){
        let result= await this.db.select('call sp_get_genre_list()',[],true)
        return result
    }
    async getVideoData(videoID,req){
        let result= await this.db.selectSingle('call sp_get_video_all_info(?)',[[videoID]],true)
        if(result && result.comments)
            result.comments=JSON.parse(result.comments);
        return result
    }

    async addNewComment(formData,req){
        let result= await this.db.selectSingle('call sp_admin_add_new_comment(?)',[[formData.comment,req.user.id,formData.videoID]],true)
        if(result.newComment)
            result.newComment=JSON.parse(result.newComment)
        return result.newComment
    }

    async getMyVideos(req){
        let result= await this.db.select('call sp_get_my_videos(?)',[req.user.id],true)
        if(result.length)
            result=JSON.parse(result[0].videosData)
        return result
    }

}
