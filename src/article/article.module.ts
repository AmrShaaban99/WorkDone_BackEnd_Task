import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { JwtModule } from '@nestjs/jwt';
import { Article, ArticleSchema } from './entities/article.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

let configService:ConfigService;
@Module({
  imports:[ MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ConfigModule.forRoot({isGlobal:true}),
  JwtModule.registerAsync({
  imports: [ConfigModule], 
  inject: [ConfigService], 
  useFactory: async (configService: ConfigService) => ({ // Define a factory function that returns the configuration object
    secret: configService.get<string>("JWT_SECRET"), // Use the get method of ConfigService to retrieve the JWT secret
    signOptions: { expiresIn: '1200s' }, // Keep your signOptions as is
  })
  })],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
``