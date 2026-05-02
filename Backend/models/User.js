const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // ❌ REMOVE unique
  }, 
  email: {
    type: String,
    unique: true,   // ✅ correct (email should be unique)
    required: true,
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;