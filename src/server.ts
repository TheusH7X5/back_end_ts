import express from 'express';
import sequelize from './config/database';
import routes from './routes/routes';

const app = express();
app.use(express.json());

sequelize.sync().then(() => {
  app.use('/', routes);

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});
