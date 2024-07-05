import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import{hashPassword} from "../../common/Helper"
@Schema({ timestamps: true })
export class User{

@Prop()
firstName:string

@Prop()
lastName:string

@Prop({ unique: true })
email:string 

@Prop()
password:string

}

export const UserSchema =SchemaFactory.createForClass(User)

UserSchema.pre("save",async function (next) {
    const user = this 
    console.log(user)
    if(user.isModified("password")){
        try{
            user.password = await hashPassword(user.password)
        }catch(error){
            console.log("the services is not available")
        }
    }
    next()
});
