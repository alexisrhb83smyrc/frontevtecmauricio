import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Producto } from './Producto.model.js';

export const Inventario = sequelize.define(
  'Inventario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,

    createdAt: true,

    updatedAt: false,
  },
);


