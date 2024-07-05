import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
let configService:ConfigService;
@Module({
  imports:[MongooseModule.forFeature([
    {
      "name":User.name,
      schema:UserSchema
    },

  ]),
  JwtModule.registerAsync({
  imports: [ConfigModule], // Import ConfigModule here so that ConfigService can be injected
  inject: [ConfigService], // Specify that we want to inject ConfigService
  useFactory: async (configService: ConfigService) => ({ // Define a factory function that returns the configuration object
    secret: configService.get<string>("JWT_SECRET"), // Use the get method of ConfigService to retrieve the JWT secret
    signOptions: { expiresIn: '1200s' }, // Keep your signOptions as is
  }),
}),
  ConfigModule.forRoot({isGlobal:true})
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

// JwtModule.registerAsync({
//   imports: [ConfigModule], // Import ConfigModule here so that ConfigService can be injected
//   inject: [ConfigService], // Specify that we want to inject ConfigService
//   useFactory: async (configService: ConfigService) => ({ // Define a factory function that returns the configuration object
//     secret: configService.get<string>("JWT_SECRET"), // Use the get method of ConfigService to retrieve the JWT secret
//     signOptions: { expiresIn: '1200s' }, // Keep your signOptions as is
//   }),
// }),