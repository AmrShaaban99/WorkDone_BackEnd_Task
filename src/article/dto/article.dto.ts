import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";
export class ArticleDto {

@ApiProperty()   
@IsNotEmpty()
@IsString()
title: string;

@ApiProperty()   
@IsNotEmpty()
@IsString()
content:string;

@ApiProperty()   
@IsNotEmpty()
author:mongoose.Schema.Types.ObjectId;
}