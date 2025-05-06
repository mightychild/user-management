require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const adminData = {
    name: 'Admin',
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 12),
    role: 'admin'
  };

  await User.findOneAndUpdate(
    { email: adminData.email },
    adminData,
    { upsert: true, new: true }
  );

  console.log('Admin user ready: admin@example.com / admin123');
  process.exit();
};

seedAdmin().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});