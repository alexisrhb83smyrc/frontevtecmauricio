import { Router } from 'express';
import {
  ActualizarSalidaProducto,
  CrearSalidaProducto,
  ListSalidaProducto,
} from '../controllers/Salida.controller.js';

const router = Router();

router.post('/api/vender/producto', CrearSalidaProducto);
router.get('/api/productoVendido', ListSalidaProducto);
router.put('/api/update/venta/:id', ActualizarSalidaProducto);

export default router;
