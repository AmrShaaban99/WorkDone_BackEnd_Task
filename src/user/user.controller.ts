import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {  loginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './AuthGuard';
import { ApiCreatedResponse, ApiSecurity } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService ,
    private jwtService: JwtService) {}

  @ApiCreatedResponse({
    description:"sign up user object as response"
  })  
  @ApiSecurity('JWT-auth')
  @Post('/sign-up/')
  async signUp(@Body() createUserDto: UserDto) {
    try{
      const existingUser = await this.userService.findUserByEmail(createUserDto.email);
      if (existingUser) {
          return({message: "This email has already been used"});
      }
     return this.userService.create(createUserDto);
    }catch(error){
      throw error;
    }
  }

  @ApiCreatedResponse({
    description:"login user"
  })  
  @ApiSecurity('JWT-auth')
  @Post("login")
  async login(@Body() User: loginUserDto){

    const user = await this.userService.findUserByEmail(User.email);
    if(!user){
      return {message: "Invalid login"};
    }
    const isMatch = await this.userService.comparePassword( User.password,user?.password);
    if(!isMatch){
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  @ApiCreatedResponse({
    description:"Get all users"
  })  
  @ApiSecurity('JWT-auth')
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @ApiCreatedResponse({
    description:"Get User by Id"
  })  
  @ApiSecurity('JWT-auth')
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiCreatedResponse({
    description:"Update User by Id"
  })  
  @ApiSecurity('JWT-auth')
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiCreatedResponse({
    description:"Delete User by Id"
  })  
  @ApiSecurity('JWT-auth')
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

