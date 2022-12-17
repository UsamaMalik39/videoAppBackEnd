import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class newCommentDTO{
    @ApiProperty()
    @IsNotEmpty()
    videoID:number;

    @ApiProperty()
    @IsNotEmpty()
    comment:string;
}
