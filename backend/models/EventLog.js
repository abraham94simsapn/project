import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EventLog = sequelize.define('EventLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: DataTypes.INTEGER,
  eventType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  details: DataTypes.JSON,
  ipAddress: DataTypes.STRING,
  userAgent: DataTypes.STRING
});

export default EventLog;