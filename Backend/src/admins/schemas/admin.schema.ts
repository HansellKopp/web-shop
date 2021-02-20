import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin extends Document {
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

  @Prop({ type: String, required: true })
  role: string;

}

export const AdminSchema = SchemaFactory.createForClass(Admin);
