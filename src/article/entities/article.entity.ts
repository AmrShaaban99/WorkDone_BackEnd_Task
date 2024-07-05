import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import {IsNotEmpty, IsString}from "class-validator"
import { Types } from "mongoose"
@Schema({ timestamps: true })

export class Article{

@ApiProperty() 
@Prop()
@IsNotEmpty()
@IsString()
title:string

@ApiProperty() 
@Prop()
@IsNotEmpty()
@IsString()
content:string

@ApiProperty() 
@Prop({ ref: 'User'})
author: Types.ObjectId

}

export const ArticleSchema =SchemaFactory.createForClass(Article)
