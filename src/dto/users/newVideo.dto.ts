import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class newVideoDTO{
    @ApiProperty()
    @IsNotEmpty()
    title:string;

    @ApiProperty()
    @IsNotEmpty()
    producer:string;

    @ApiProperty()
    @IsNotEmpty()
    genre:string;

    @ApiProperty()
    @IsNotEmpty()
    rating:string;

    @ApiProperty()
    @IsNotEmpty()
    url:string;

    @ApiProperty()
    @IsNotEmpty()
    thumbnail:string;

    @ApiProperty()
    @IsNotEmpty()
    publisher:string;
}