import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './v1/routes/user';
import redFlagRoutes from './v1/routes/red-flags';
import swaggerDocument from './v1/swagger/swagger.json';

const app = express();

const swaggerOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
};

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/v2/auth', userRoutes);
app.use('/api/v2/red-flags', redFlagRoutes);
app.use('/api/v2/api-docs', swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions));

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status);
  res.json({
    status,
    error: error.message,
  });
});

export default app;