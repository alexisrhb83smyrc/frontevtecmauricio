import { Producto } from '../models/Producto.model.js';

export const ListProducto = async (req, res) => {
  try {
    const product = await Producto.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: 'ERROR SERVIDOR' });
  }
};
