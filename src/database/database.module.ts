// src/database/database.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://user:${process.env.DB_PASSWORD}@cluster0.wrf7awp.mongodb.net/chatgram?retryWrites=true&w=majority&appName=Cluster0`,
    ),
  ],
})
export class DatabaseModule {}
