import { Injectable } from '@nestjs/common';
import{InjectModel}from '@nestjs/mongoose'
import {  loginUserDto} from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel:Model<User>){}
  
  create(createUserDto: UserDto) {
    try{
      const newUser=new this.userModel(createUserDto)
      return newUser.save()
    }catch(error){
      return {"error":error}
    }

  }

  async findAll() {
    return await this.userModel.find().lean();
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({"email":email}).lean();
  }
  async findOne(id: string) {
    return await this.userModel.findOne({"_id":id}).select({ password: 0, _id: 0 }).lean();
  }

  async update(id: string, updateUserDto: UserDto) {
    const user = await this.userModel.findById(id);
    if (!user) return null;
    user.set(updateUserDto);
    const updatedUser = await user.save();
    return updatedUser;
    
  }
  
  async remove(id: string) {
        return await this.userModel.findByIdAndDelete(id);
  }
  comparePassword = async (password :string, hashedPassword :string) => {
    return await bcrypt.compare(password, hashedPassword);
  }
}
