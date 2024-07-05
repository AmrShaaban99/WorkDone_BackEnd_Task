import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('WorkDone BackEnd Task')
    .setVersion('1.0')
    .addTag('example')
    .addBearerAuth({
      type:'http',
      scheme:"bearer",
      bearerFormat:"JWT",
      name:"JWT",
      description:"Enter JWT Token",
      in:'header'

    },'JWT-auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const configService=app.get(ConfigService)
  const port =configService.get('PORT')
  await app.listen(port);
}
bootstrap();
