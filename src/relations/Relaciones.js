import { Producto } from '../models/Producto.model.js';
import { Entrada } from '../models/Entrada.model.js';
import { Salida } from '../models/Salida.model.js';
import { Inventario } from '../models/Inventario.model.js';

Producto.hasMany(Entrada, { foreignKey: 'productoId' });
Entrada.belongsTo(Producto, { foreignKey: 'productoId' });

Producto.hasMany(Salida, { foreignKey: 'productoId' });
Salida.belongsTo(Producto, { foreignKey: 'productoId' });

Producto.hasOne(Inventario, { foreignKey: 'productoId' });
Inventario.belongsTo(Producto, { foreignKey: 'productoId' });
