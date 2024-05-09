import { SubscriberInterface } from '@project/shared/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'blog-users',
  timestamps: true
})
export class EmailSubscriberModel extends Document implements SubscriberInterface {
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

  @Prop({
    required: true
  })
  passwordHash: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
