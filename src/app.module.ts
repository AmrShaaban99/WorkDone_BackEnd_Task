import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [UserModule,
  ConfigModule.forRoot({isGlobal:true}),
  MongooseModule.forRootAsync({
    imports: [ConfigModule], 
    inject: [ConfigService], 
    useFactory: async (configService: ConfigService) => ({ 
     uri: configService.get<string>("MONGO_URI"),
     })
    }),
  ArticleModule
]
})
export class AppModule {}
