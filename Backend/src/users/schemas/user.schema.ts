import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  given_name: string;

  @Prop({ type: String, required: true })
  family_name: string;

  @Prop({ type: String, required: false })
  nickname: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  picture: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: Boolean, required: true })
  email_verified: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
