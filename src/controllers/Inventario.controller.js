import { sequelize } from '../database/database.js';
import { Producto } from '../models/Producto.model.js';
import { Entrada } from '../models/Entrada.model.js';
import { Salida } from '../models/Salida.model.js';
import { Inventario } from '../models/Inventario.model.js';

export const ListarInventario = async (req, res) => {
  try {
    const productos = await Producto.findAll();

    for (let index = 0; index < productos.length; index++) {
      const producto = productos[index];
      const entrada = await Entrada.findOne({
        where: { productoId: producto.id },
      });
      const salida = await Salida.findOne({
        where: { productoId: producto.id },
      });

      const cantidadEntrada = entrada ? entrada.dataValues.cantidad : 0;
      const cantidadSalida = salida ? salida.dataValues.cantidad : 0;
      const cantidadActual = cantidadEntrada - cantidadSalida;

      // Busca un registro de Inventario existente para el producto
      let inventario = await Inventario.findOne({
        where: { productoId: producto.id },
      });

      // Si no existe un registro de Inventario, crea uno
      if (!inventario) {
        inventario = await Inventario.create({
          productoId: producto.id,
          cantidad_actual: cantidadActual,
        });
      } else {
        // Si el registro de Inventario ya existe, actualiza la cantidad_actual
        inventario.cantidad_actual = cantidadActual;
        await inventario.save();
      }
    }

    // Consulta el inventario nuevamente para obtener la información completa
    const inventarioCompleto = await Producto.findAll({
      include: [{ model: Inventario }],
    });

    return res.status(200).json(inventarioCompleto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};
