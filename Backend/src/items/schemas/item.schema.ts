import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})
export class Item extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: false })
  subtitle: string;

  @Prop({ type: String, required: true })
  excerpt: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Array, required: true })
  images: Array<string>;

  @Prop({ type: Array, required: true })
  categories: Array<string>;

  @Prop({ type: String, required: true, default: 'active'})
  status: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);