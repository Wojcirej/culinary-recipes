import { CulinaryRecipesPrismaClient } from './prisma/culinaryRecipesPrismaClient';

module.exports = async function testTeardown() {
  const database = new CulinaryRecipesPrismaClient();
  await database.clearDatabase();
};
