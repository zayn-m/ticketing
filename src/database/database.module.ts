import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseService } from "./database.service";
import * as config from 'config';
import { ConfigService } from "@nestjs/config";

const dbConfig = config.get('db');

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('NODE_ENV') === 'test'
          ? process.env.MONGO_TEST_URI || dbConfig.test_uri
          : process.env.MONGO_URI || dbConfig.uri
      }),
      inject: [ConfigService]
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})

export class DatabaseModule {}