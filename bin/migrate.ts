import { CulinaryRecipesPrismaClient } from '../src/infrastructure/culinaryRecipesPrismaClient';
import { exec } from 'child_process';

const connectionString = CulinaryRecipesPrismaClient.prepareConnectionString();
const output = exec(`DATABASE_URL=${connectionString} npx prisma migrate dev`);
output.stdout.on('data', function (data) {
  console.log(data);
});
