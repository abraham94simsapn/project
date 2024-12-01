import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Color = sequelize.define('Color', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  hexCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^#[0-9A-F]{6}$/i
    }
  }
});

export default Color;