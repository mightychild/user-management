const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');

// Configure Multer for file uploads
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('profilePhoto');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

// Get all users (admin only)
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select('-__v -password');

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

// Get single user
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-__v -password');

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// Create new user (admin only)
exports.createUser = catchAsync(async (req, res, next) => {
  // Prevent non-admins from creating admin accounts
  if (req.body.role === 'admin' && req.user.role !== 'admin') {
    return next(new AppError('Only admins can create admin users', 403));
  }

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role || 'user',
    status: req.body.status || 'active'
  };

  // Add profile photo if uploaded
  if (req.file) {
    userData.profilePhoto = `/img/users/${req.file.filename}`;
  }

  const newUser = await User.create(userData);

  // Remove sensitive data from output
  newUser.password = undefined;
  newUser.active = undefined;

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

// Update user (admin or self)
exports.updateUser = catchAsync(async (req, res, next) => {
  // Check if user is trying to update another user without admin privileges
  if (req.params.id !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You can only update your own account', 403));
  }

  // Prevent non-admins from changing roles
  if (req.body.role && req.body.role !== req.user.role && req.user.role !== 'admin') {
    return next(new AppError('Only admins can change user roles', 403));
  }

  // Filter out unwanted fields
  const filteredBody = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    status: req.body.status
  };

  // Add profile photo if uploaded
  if (req.file) {
    filteredBody.profilePhoto = `/img/users/${req.file.filename}`;
  }

  // Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  ).select('-__v -password');

  if (!updatedUser) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

// Delete user (admin only)
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Get current user profile
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-__v -password');

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// Update current user profile
exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // Filtered out unwanted fields
  const filteredBody = {
    name: req.body.name,
    email: req.body.email
  };

  // Add profile photo if uploaded
  if (req.file) {
    filteredBody.profilePhoto = `/img/users/${req.file.filename}`;
  }

  // Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  ).select('-__v -password');

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

// Deactivate current user
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});