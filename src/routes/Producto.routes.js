import { Router } from 'express';
import cors from 'cors';
import { ListProducto } from '../controllers/Producto.controller.js';

const router = Router();
router.get('/api/productos', cors(), ListProducto);

export default router;
