import express from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import entrada from './routes/Entrada.routes.js';
import salida from './routes/Salida.routes.js';
import inventario from './routes/inventario.routes.js';
import './relations/Relaciones.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
const swaggerDoc = YAML.load('src/doc.yaml');
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(entrada);
app.use(salida);
app.use(inventario);
export default app;
