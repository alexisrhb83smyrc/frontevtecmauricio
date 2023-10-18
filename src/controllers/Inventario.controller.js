import { sequelize } from '../database/database.js';
import { Producto } from '../models/Producto.model.js';
import { Entrada } from '../models/Entrada.model.js';
import { Salida } from '../models/Salida.model.js';
import { Inventario } from '../models/Inventario.model.js';

export const ListarInventario = async (req, res) => {
  try {
    const inventario = await Producto.findAll({
      attributes: ['id', 'producto', 'descripcion'],
      include: [
        {
          model: Entrada,
          attributes: [
            [sequelize.fn('SUM', sequelize.col('cantidad')), 'total_entradas'],
          ],
        },
        {
          model: Salida,
          attributes: [
            [sequelize.fn('SUM', sequelize.col('cantidad')), 'total_salidas'],
          ],
        },
      ],
      group: ['Producto.id'],
    });

    console.log(inventario, ' que es esto xd');
    // const cantidad_actual = inventario.map((producto) => {
    //   const totalEntradas = producto.Entrada
    //     ? producto.Entrada[0].dataValues.total_entradas
    //     : 0;
    //   const totalSalidas = producto.Salida
    //     ? producto.Salida[0].dataValues.total_salidas
    //     : 0;
    //   const cantidadActual = totalEntradas - totalSalidas;

    //   return {
    //     id: producto.id,
    //     producto: producto.producto,
    //     descripcion: producto.descripcion,
    //     cantidad_actual: cantidadActual,
    //   };
    // });
    const inventarios = await Inventario.create({ cantidad_actual });
    return res.status(200).json(cantidad_actual);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};
