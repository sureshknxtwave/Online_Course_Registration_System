// models/PurchasedCourse.js

const mongoose = require('mongoose');

const PurchasedCourseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  
  courseName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const PurchasedCourse = mongoose.model('PurchasedCourse', PurchasedCourseSchema);

module.exports = PurchasedCourse;
