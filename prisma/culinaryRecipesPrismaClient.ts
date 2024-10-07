import { PrismaClient } from '@prisma/client';
import configuration from '../config/settings/main';

export class CulinaryRecipesPrismaClient extends PrismaClient {
  constructor() {
    super({
      datasourceUrl: CulinaryRecipesPrismaClient.prepareConnectionString(),
    });
  }

  public async clearDatabase() {
    await this.ingredient.deleteMany();
    await this.recipe.deleteMany();
    await this.$queryRaw`ALTER SEQUENCE ingredients_id_seq RESTART WITH 1;`;
    await this.$queryRaw`ALTER SEQUENCE recipes_id_seq RESTART WITH 1;`;
  }

  public static prepareConnectionString(): string {
    const { database } =
      configuration[process.env.CULINARY_RECIPES_ENV || 'development']();
    const { host, port, username, password, name } = database;
    return `postgresql://${username}:${password}@${host}:${port}/${name}`;
  }
}
