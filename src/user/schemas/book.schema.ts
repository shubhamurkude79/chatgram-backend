import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  profilePicUrl: string;

  @Prop({ type: 'date' })
  lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
