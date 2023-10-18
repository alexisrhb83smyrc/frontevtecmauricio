import { Router } from 'express';
import { CrearProducto, ListProducto } from '../controllers/Entrada.controller.js';

const router = Router();

router.post("/api/crear/producto",CrearProducto)
router.get('/api/producto', ListProducto);
export default router;