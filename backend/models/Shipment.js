import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Shipment = sequelize.define('Shipment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  trackingNumber: DataTypes.STRING,
  carrier: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('pending', 'shipped', 'delivered'),
    defaultValue: 'pending'
  },
  estimatedDeliveryDate: DataTypes.DATE
});

export default Shipment;