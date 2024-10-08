import { CulinaryRecipesPrismaClient } from './src/infrastructure/culinaryRecipesPrismaClient';

module.exports = async function testTeardown() {
  const database = new CulinaryRecipesPrismaClient();
  await database.clearDatabase();
};
