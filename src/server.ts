import dotenv from 'dotenv';
import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './database/data-source';

dotenv.config();

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server's running on port ${process.env.API_PORT}!⚡⚡⚡`);
});
AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
  })
  .catch((error: any) => console.log('DataSource Error: ', error));
