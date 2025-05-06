const mongoose = require('mongoose');
const User = require('./User');

// Register models
const models = {
  User
};

// Export models and mongoose connection
module.exports = {
  mongoose,
  ...models
};