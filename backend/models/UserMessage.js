import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserMessage = sequelize.define('UserMessage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subject: DataTypes.STRING,
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default UserMessage;