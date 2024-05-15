import { StorableJWTTokenInterface } from '@project/shared/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'refresh-tokens',
  timestamps: true
})
export class RefreshTokenModel extends Document implements StorableJWTTokenInterface {
  @Prop()
  createdAt: Date;

  @Prop({ required: true })
  expiresIn: Date;

  @Prop({ required: true })
  tokenId: string;

  @Prop({ required: true })
  userId: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel);
