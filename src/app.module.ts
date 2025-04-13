import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [{
    provide: 'DATA_SOURCE',
    useFactory: async (config : ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: config.get<string>("DB_CONNECTION"),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
      })
      return dataSource.initialize()
    },
    inject: [ConfigService]
  },AppService],
})
export class AppModule {}
