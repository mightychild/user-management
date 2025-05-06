const validator = require('validator');
const AppError = require('./errorHandler');

exports.validateUserInput = (data) => {
  if (!data.name || !data.email) {
    throw new AppError('Name and email are required', 400);
  }

  if (!validator.isEmail(data.email)) {
    throw new AppError('Please provide a valid email', 400);
  }

  if (data.role && !['user', 'admin'].includes(data.role)) {
    throw new AppError('Role must be either user or admin', 400);
  }

  if (data.status && !['active', 'inactive'].includes(data.status)) {
    throw new AppError('Status must be either active or inactive', 400);
  }
};