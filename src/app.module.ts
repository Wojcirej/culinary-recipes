import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AddNewRecipeModule } from './app/addNewRecipe/addNewRecipe.module';
import configuration from './../config/settings/main';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration[process.env.CULINARY_RECIPES_ENV || 'development']],
    }),
    AddNewRecipeModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
