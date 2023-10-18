import { Router } from 'express';

import { ListarInventario } from '../controllers/Inventario.controller.js';

const router = Router();

router.get('/api/inventario', ListarInventario);

export default router;
