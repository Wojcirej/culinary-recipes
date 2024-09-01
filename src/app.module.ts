import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/settings/main';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration[process.env.CULINARY_RECIPES_ENV || 'development']],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
