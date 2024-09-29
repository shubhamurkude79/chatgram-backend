// src/app.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    await this.fetchAllCollections();
  }

  async fetchAllCollections() {
    try {
      const collections = await this.connection.db.listCollections().toArray();
      console.log(
        'Collections:',
        collections.map((col) => col.name),
      );
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  }
}
