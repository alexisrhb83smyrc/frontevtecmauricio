import { Router } from 'express';
import {
  CrearProducto,
  ListProducto,
  ActualizarProducto,
  BorrarProducto,
} from '../controllers/Entrada.controller.js';

const router = Router();

router.post('/api/crear/producto', CrearProducto);
router.get('/api/producto', ListProducto);
router.put('/api/update/producto/:id', ActualizarProducto);
router.delete('/api/delete/producto/:id', BorrarProducto);
export default router;
