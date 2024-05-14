import { AuthUserInterface } from '@project/shared/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'blog-users',
  timestamps: true
})
export class BlogUserModel extends Document implements AuthUserInterface {
  @Prop({
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    required: true
  })
  firstName: string;

  @Prop({
    required: true
  })
  lastName: string;

  @Prop()
  avatar: string;

  @Prop()
  subscriptions: string[];

  @Prop({
    required: true
  })
  passwordHash: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
