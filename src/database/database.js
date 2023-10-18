import Sequelize from 'sequelize';

export const sequelize = new Sequelize('almacen', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
  // logging: false,
});
