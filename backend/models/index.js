import sequelize from '../config/database.js';
import User from './User.js';
import Product from './Product.js';
import Category from './Category.js';
import Brand from './Brand.js';
import Color from './Color.js';
import Size from './Size.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Address from './Address.js';
import Payment from './Payment.js';
import Review from './Review.js';
import Wishlist from './Wishlist.js';
import PriceHistory from './PriceHistory.js';
import Discount from './Discount.js';
import Shipment from './Shipment.js';
import UserMessage from './UserMessage.js';
import Notification from './Notification.js';
import EventLog from './EventLog.js';

// Define relationships
User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Address);
Address.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

User.hasOne(Wishlist);
Wishlist.belongsTo(User);

Product.belongsTo(Category);
Product.belongsTo(Brand);
Product.belongsToMany(Color, { through: 'ProductColors' });
Product.belongsToMany(Size, { through: 'ProductSizes' });

Product.hasMany(Review);
Review.belongsTo(Product);

Product.hasMany(PriceHistory);
PriceHistory.belongsTo(Product);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

Order.hasOne(Payment);
Payment.belongsTo(Order);

Order.hasOne(Shipment);
Shipment.belongsTo(Order);

Product.belongsToMany(Discount, { through: 'ProductDiscounts' });
Discount.belongsToMany(Product, { through: 'ProductDiscounts' });

User.hasMany(UserMessage);
UserMessage.belongsTo(User);

User.hasMany(Notification);
Notification.belongsTo(User);

export {
  sequelize,
  User,
  Product,
  Category,
  Brand,
  Color,
  Size,
  Order,
  OrderItem,
  Address,
  Payment,
  Review,
  Wishlist,
  PriceHistory,
  Discount,
  Shipment,
  UserMessage,
  Notification,
  EventLog
};