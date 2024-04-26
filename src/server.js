import env from 'dotenv';
import { sequelize } from './database/models/index';
import app from './app';

env.config();
const port = process.env.PORT || 7002;

app.listen(port, () => {
  console.log('server started,', port);
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.',
    );
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
export default app;
