import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
  @Prop({ type: String, required: true })
  slug: string;

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

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: Array, required: true })
  categories: Array<string>;

}

export const ItemSchema = SchemaFactory.createForClass(Item);