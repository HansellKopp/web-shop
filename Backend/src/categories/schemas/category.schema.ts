import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})
export class Category extends Document {
  @Prop({ type: String, required: true })
  title: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);