import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import * as config from 'config';
import { DatabaseModule } from './database/database.module';

const dbConfig = config.get('db');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || dbConfig.uri),
    UsersModule,
    DatabaseModule,
  ],
})
export class AppModule {}
