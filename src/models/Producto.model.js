import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Entrada } from './Entrada.model.js';
import { Salida } from './Salida.model.js';
import { Inventario } from './Inventario.model.js';

export const Producto = sequelize.define(
  'Producto',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    producto: {
      type: DataTypes.STRING,
      allownull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allownull: false,
    },
  },
  {
    timestamps: false,

    createdAt: true,

    updatedAt: false,
  },
);

