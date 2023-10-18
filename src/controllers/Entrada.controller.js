import { Producto } from '../models/Producto.model.js';
import { Entrada } from '../models/Entrada.model.js';
import { sequelize } from '../database/database.js';

export const CrearProducto = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { cantidad, producto, descripcion } = req.body;
    const product = await Producto.create({ producto, descripcion });
    const productoId = product.id;
    const entrada = await Entrada.create({ cantidad, productoId });

    await t.commit();
    return res.status(200).json({ message: 'Producto creada' });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.status(500).json({ message: 'ERROR SERVIDOR' });
  }
};

export const ActualizarProducto = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    const product = await Producto.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: 'No se encontro el producto' });
    } else {
      product.set(req.body);
      await product.save();
    }
    await t.commit();
    return res.status(200).json({ message: 'Nota actualizada' });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

export const BorrarProducto = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    const product = await product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await Producto.destroy({ where: { id } });
    await t.commit();
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: 'Error de servidor' });
  }
};

export const ListProducto = async (req, res) => {
  try {
    const product = await Producto.findAll({
      include: [{ model: Entrada }],
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'ERROR SERVIDOR' });
  }
};
