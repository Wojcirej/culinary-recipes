export default () => ({
  database: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: 'kucharz',
    password: 'password',
    name: 'culinary_recipes_test'
  }
});
