import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AddNewRecipeModule } from './app/addNewRecipe/addNewRecipe.module';
import configuration from './../config/settings/main';
import { HealthcheckModule } from './app/healthcheck/healthcheck.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration[process.env.CULINARY_RECIPES_ENV || 'development']],
    }),
    HealthcheckModule,
    AddNewRecipeModule,
  ],
})
export class AppModule {}
