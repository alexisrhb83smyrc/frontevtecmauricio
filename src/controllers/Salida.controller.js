import { Producto } from '../models/Producto.model.js';
import { Salida } from '../models/Salida.model.js';
import { sequelize } from '../database/database.js';
import { Inventario } from '../models/Inventario.model.js';

export const CrearSalidaProducto = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { cantidad, producto, descripcion } = req.body;
    const product = await Producto.create({ producto, descripcion });
    const productoId = product.id;
    const salida = await Salida.create({ cantidad, productoId });
    await t.commit();
    return res.status(200).json({ message: 'Producto vendido' });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.status(500).json({ message: 'ERROR SERVIDOR' });
  }
};

export const ActualizarSalidaProducto = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    const product = await Producto.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({ message: 'No se encontró el producto' });
    }
    const totalSalida = await Salida.findOne({
      where: { productoId: id },
    });
    const nuevaCantidad = totalSalida.cantidad + req.body.cantidad;

    totalSalida.cantidad = nuevaCantidad;
    product.nombre_producto = req.body.nombre_producto;
    product.descripcion = req.body.descripcion;

    await product.save({ transaction: t });
    await totalSalida.save({ transaction: t });
    await t.commit();
    return res.status(200).json({ message: 'Venta actualizada' });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

export const ListSalidaProducto = async (req, res) => {
  try {
    const product = await Producto.findAll({
      include: [{ model: Salida }],
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'ERROR SERVIDOR' });
  }
};
