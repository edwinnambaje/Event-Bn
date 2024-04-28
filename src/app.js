import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swagger from './config/swagger';
import allRoutes from './routes/index';

env.config();
const app = express();
app.use(cors());
app.use(
  express.json({
    limit: '50mb',
  }),
);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Event Management System API',
  });
});
app.use(allRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger));

app.use((req, res) => {
  return res.status(404).json({ status: 'fail', message: 'Page not found' });
});

export default app;
